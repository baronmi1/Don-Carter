const Transaction = require("../models/transactionModel");
const Active = require("../models/activeModel");
const Earning = require("../models/earningModel");
const Wallet = require("../models/walletModel");
const Plan = require("../models/planModel");
const Referral = require("../models/referralModel");
const Company = require("../models/companyModel");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Email = require("../models/emailModel");
const SendEmail = require("../utils/email");
const notificationController = require("../controllers/notificationController");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createTransaction = catchAsync(async (req, res, next) => {
  const data = req.body;
  if (data.autoTransact) {
    const plan = await Plan.findOne({ planName: data.planName });
    data.planCycle = plan.planCycle;
    data.planDuration = plan.planDuration;
    data.percent = plan.planPercentage;

    const wallet = await Wallet.findOne({
      name: data.walletName,
      username: data.username,
    });
    data.walletId = wallet.walletId;
    data.symbol = wallet.symbol;

    await Transaction.create(data);

    next();
  } else {
    if (data.fromBalance == "true") {
      data.reinvest = true;
    }

    await Transaction.create(data);

    if (data.transactionType == "withdrawal") {
      await Wallet.findByIdAndUpdate(data.walletId, {
        $inc: { pendingWithdrawal: data.amount },
      });
    } else {
      await Wallet.findByIdAndUpdate(data.walletId, {
        $inc: { pendingDeposit: data.amount },
      });
    }

    sendTransactionEmail(data.user, data.transactionType, data.amount, next);
    notificationController.createNotification(
      data.user.username,
      data.transactionType,
      data.date,
      data.dateCreated
    );

    next();
  }
});

exports.updateTransaction = catchAsync(async (req, res, next) => {
  const data = req.body;
  const plan = await Plan.findOne({ planName: data.planName });
  data.planCycle = plan.planCycle;
  data.planDuration = plan.planDuration;
  const wallet = await Wallet.findOne({
    name: data.walletName,
    username: data.username,
  });
  data.walletId = wallet.walletId;
  data.symbol = wallet.symbol;

  await Transaction.findByIdAndUpdate(req.params.id, data);

  next();
});

exports.getTransactions = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Transaction.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const transactions = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: transactions,
    resultLength: resultLen.length,
  });
});

exports.getActiveDeposits = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Active.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;
  const features = result.paginate();
  const transactions = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: transactions,
    resultLength: resultLen.length,
  });
});

exports.getTransactionVolume = catchAsync(async (req, res, next) => {
  const transactionVolume = await Transaction.aggregate([
    {
      $match: {
        username: req.query.username,
      },
    },
    { $group: { _id: "$transactionType", volume: { $sum: "$amount" } } },
  ]);

  res.status(200).json({
    status: "success",
    data: transactionVolume,
  });
});

exports.getDepositList = catchAsync(async (req, res, next) => {
  const transactionVolume = await Transaction.aggregate([
    {
      $match: {
        username: req.query.username,
      },
    },
    {
      $group: {
        _id: { transactionType: "$transactionType", planName: "$planName" },
        amount: { $first: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: transactionVolume,
  });
});

const deleteActiveDeposit = async (id, time) => {
  const activeResult = await Active.findById(id);
  if (activeResult) {
    await Wallet.findByIdAndUpdate(activeResult.walletId, {
      $inc: {
        balance:
          activeResult.earning * 1 +
          Number((activeResult.amount * activeResult.percent * time) / 100),
      },
    });

    await User.findOneAndUpdate(
      { username: activeResult.username },
      {
        $inc: {
          totalBalance:
            activeResult.earning * 1 +
            Number((activeResult.amount * activeResult.percent * time) / 100),
        },
      }
    );

    await Active.findByIdAndDelete(activeResult._id);
    const user = await User.findOne({ username: activeResult.username });
    sendTransactionEmail(
      user,
      `investment-completion`,
      activeResult.amount,
      next
    );

    console.log(`A plan has completed successfully`);
  }
};

const startActiveDeposit = async (
  activeDeposit,
  earning,
  timeRemaining,
  interval
) => {
  const seconds = Math.floor((timeRemaining / 1000) % 60);
  const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);

  // print the result
  console.log(
    `The next earning will be executed in: ${hours} hours, ${minutes} minutes, ${seconds} seconds`
  );

  const intervalId = setInterval(async () => {
    const newTime = (activeDeposit.time += interval);

    await Active.updateOne(
      { _id: activeDeposit._id },
      {
        $inc: { earning: earning * 1, daysRemaining: -interval * 1 },
        time: newTime,
      }
    );

    const form = {
      symbol: activeDeposit.symbol,
      depositId: activeDeposit._id,
      username: activeDeposit.username,
      amount: activeDeposit.amount,
      earning: earning,
      referredBy: activeDeposit.referralUsername,
      walletName: activeDeposit.walletName,
      walletId: activeDeposit.walletId,
      time: activeDeposit.time,
    };

    timeRemaining -= interval;
    await Earning.create(form);
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    console.log(
      `The time remaining is ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`
    );

    if (Math.floor(timeRemaining / (60 * 1000)) <= 0) {
      console.log(`the time has elapsed completely`);
      deleteActiveDeposit(activeDeposit._id, 0);
      clearInterval(intervalId);
    }
  }, interval);
};

exports.approveDeposit = catchAsync(async (req, res, next) => {
  req.body.status = true;
  await Transaction.findByIdAndUpdate(req.params.id, req.body);

  if (!req.body.reinvest) {
    await Wallet.findByIdAndUpdate(req.body.walletId, {
      $inc: { balance: req.body.amount },
    });
    await User.findOneAndUpdate(
      { username: req.body.username },
      { $inc: { totalBalance: req.body.amount } }
    );
  }

  if (req.body.transactionType == "withdrawal") {
    await Wallet.findByIdAndUpdate(req.body.walletId, {
      $inc: { pendingWithdrawal: req.body.amount * -1 },
    });
  } else {
    await Wallet.findByIdAndUpdate(req.body.walletId, {
      $inc: { pendingDeposit: req.body.amount * -1 },
    });
  }
  // req.body.planCycle = 60 * 1000;
  // req.body.planDuration = 4 * 60 * 1000;
  // req.body.daysRemaining = req.body.planDuration;
  req.body.planDuration = req.body.planDuration * 24 * 60 * 60 * 1000;
  req.body.daysRemaining = req.body.planDuration;
  req.body.serverTime = new Date().getTime();
  const earning = Number((req.body.amount * req.body.percent) / 100).toFixed(2);
  req.body.earning = 0;
  const activeDeposit = await Active.create(req.body);

  startActiveDeposit(
    activeDeposit,
    earning,
    req.body.planDuration * 1,
    req.body.planCycle * 1
  );

  const referral = await Referral.findOne({
    referralUsername: activeDeposit.username,
    regDate: { $gt: 0 },
  });

  if (referral != null || referral != undefined) {
    const percentResult = await Plan.findOne({
      planName: activeDeposit.planName,
    });

    await Wallet.findOneAndUpdate(
      { currencyId: activeDeposit.walletId, username: referral.username },
      {
        $inc: {
          balance: Number(
            (activeDeposit.amount * percentResult.referralCommission) / 100
          ),
        },
      }
    );

    const user = await User.findOneAndUpdate(
      { username: referral.username },
      {
        $inc: {
          totalBalance: Number(
            (activeDeposit.amount * percentResult.referralCommission) / 100
          ),
        },
      }
    );
    const form = {
      username: user.username,
      referralUsername: activeDeposit.username,
      amount: activeDeposit.amount,
      currencyName: activeDeposit.walletName,
      currencySymbol: activeDeposit.symbol,
      commission: Number(
        (activeDeposit.amount * percentResult.referralCommission) / 100
      ).toFixed(2),
      time: activeDeposit.time,
      regDate: referral.regDate,
    };
    await Referral.create(form);
  }

  const user = await User.findOne({ username: req.body.username });

  sendTransactionEmail(
    user,
    `${req.body.transactionType}-approval`,
    req.body.amount,
    next
  );

  next();
});

exports.approveWithdrawal = catchAsync(async (req, res, next) => {
  req.body.status = true;
  await Transaction.findByIdAndUpdate(req.params.id, req.body);

  await Wallet.findByIdAndUpdate(req.body.walletId, {
    $inc: { balance: -req.body.amount * 1 },
  });

  await User.findOneAndUpdate(
    { username: req.body.username },
    { $inc: { totalBalance: -req.body.amount * 1 } }
  );

  const user = await User.findOne({ username: req.body.username });

  sendTransactionEmail(
    user,
    `${req.body.transactionType}-approval`,
    req.body.amount,
    next
  );

  next();
});

exports.deleteTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndDelete(req.params.id);

  if (!transaction) {
    return next(new AppError("No transaction found with that ID", 404));
  }
  next();
});

const sendTransactionEmail = async (user, type, amount, next) => {
  const companyResult = await Company.find();
  const company = companyResult[0];
  const domainName = company.companyDomain;
  const companyName = company.companyName;
  const resetURL = "";

  const email = await Email.findOne({ template: type });
  const from = `${company.systemEmail}`;
  const content = email.content
    .replace("{{amount}}", amount)
    .replace("{{company-name}}", company.companyName);
  const warning = email.warning.replace(
    "{{company-name}}",
    company.companyName
  );

  const form = {
    email: from,
    username: user.username,
  };
  const receivers = [user, form];

  receivers.forEach((el) => {
    try {
      const banner = `${domainName}/uploads/${email.banner}`;
      new SendEmail(
        companyName,
        domainName,
        from,
        el,
        "transaction",
        email.title,
        banner,
        content,
        email.headerColor,
        email.footerColor,
        email.mainColor,
        email.greeting,
        warning,
        resetURL
      ).sendEmail();
    } catch (err) {
      return next(
        new AppError(
          `There was an error sending the email. Try again later!, ${err}`,
          500
        )
      );
    }
  });
};

exports.sendTransactionNotification = (io, socket) => {
  socket.on("sendNotification", async (item) => {
    const limit = item.limit;
    const users = await User.find({
      username: { $regex: item.keyWord, $options: "$i" },
      firstName: { $regex: item.keyWord, $options: "$i" },
    }).limit(limit);
    io.emit("sentNotification", users);
  });
};

exports.getEarnings = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Earning.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const earnings = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: earnings,
    resultLength: resultLen.length,
  });
});

exports.continueEarnings = catchAsync(async (req, res, next) => {
  // const timeRemaining = new Date().getTime();
  // const seconds = Math.floor((timeRemaining / 1000) % 60);
  // const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
  // const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);

  const activeDeposit = await Active.findByIdAndUpdate(req.params.id, {
    status: true,
  });

  console.log("Active deposits reactivated");

  startActiveDeposit(
    activeDeposit,
    activeDeposit.earning,
    activeDeposit.daysRemaining * 1,
    activeDeposit.planCycle * 1
  );
  next();
});

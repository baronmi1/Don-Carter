const Transaction = require("../models/transactionModel");
const Active = require("../models/activeModel");
const Wallet = require("../models/walletModel");
const Plan = require("../models/planModel");
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
    const result = await Transaction.create(data);

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

    // notificationController.createNotification(
    //   data.user.username,
    //   data.transactionType,
    //   data.date,
    //   data.dateCreated
    // );

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

const deleteActiveDeposit = async (id, time, next) => {
  const activeResult = await Active.findById(id);
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
};

const startActiveDeposit = async (
  activeDeposit,
  earning,
  duration,
  interval,
  next
) => {
  let elapsedTime = 0;

  const intervalId = setInterval(async () => {
    await Active.updateOne(
      { _id: activeDeposit._id },
      { $inc: { earning: earning, daysRemaining: -interval * 1 } }
    );

    elapsedTime += interval;
    console.log(`the elapsed time is ${elapsedTime}`);

    if (elapsedTime >= duration) {
      deleteActiveDeposit(activeDeposit._id, 0, next);
      clearInterval(intervalId);
    }
  }, interval);
};

exports.checkActive = async (next) => {
  const deposits = await Active.find();
  deposits.forEach((el) => {
    if (el.time * 1 + el.planDuration * 1 < new Date().getTime()) {
      const time = Math.floor(el.daysRemaining / el.planCycle);
      deleteActiveDeposit(el._id, time, next);
    }
  });
};

exports.approveDeposit = catchAsync(async (req, res, next) => {
  req.body.status = true;
  // await Transaction.findByIdAndUpdate(req.params.id, req.body);

  if (!req.body.reinvest) {
    await Wallet.findByIdAndUpdate(req.body.walletId, {
      $inc: { balance: req.body.amount },
    });
    await User.findOneAndUpdate(
      { username: req.body.username },
      { $inc: { totalBalance: req.body.amount } }
    );
  }
  // req.body.daysRemaining = req.body.planDuration;
  req.body.daysRemaining = 60000;
  req.body.planDuration = 60000;
  req.body.planCycle = 5000;
  req.body.earning = 0;
  req.body.time = new Date().getTime();
  const activeDeposit = await Active.create(req.body);
  const earning = Number((req.body.amount * req.body.percent) / 100).toFixed(2);

  startActiveDeposit(
    activeDeposit,
    earning,
    req.body.planDuration * 1,
    req.body.planCycle * 1,
    next
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

  try {
    const banner = `${domainName}/uploads/${email.banner}`;
    new SendEmail(
      companyName,
      domainName,
      from,
      user,
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

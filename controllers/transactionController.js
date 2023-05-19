const Transaction = require("../models/transactionModel");
const Active = require("../models/activeModel");
const Earning = require("../models/earningModel");
const Wallet = require("../models/walletModel");
const Payment = require("../models/paymentModel");
const Currency = require("../models/currencyModel");
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
  const duration = data.planDuration;

  if (data.autoTransact) {
    if (data.amount > data.wallet.balance) {
      return next(
        new AppError(
          `You have insufficient fund in this ${data.wallet.name} wallet`,
          404
        )
      );
    }

    await Wallet.findByIdAndUpdate(data.walletId, {
      $inc: {
        balance: data.amount * -1,
        totalDeposit: data.amount * 1,
      },
    });

    await User.findByIdAndUpdate(data.user._id, {
      $inc: { totalBalance: data.amount * -1 },
    });

    data.status = true;
    await Transaction.create(data);
    data.planDuration = data.planDuration * 24 * 60 * 60 * 1000;
    data.daysRemaining = data.planDuration * 1;
    data.serverTime = new Date().getTime();
    const earning = Number((data.amount * data.percent) / 100).toFixed(2);
    data.earning = 0;
    const activeDeposit = await Active.create(data);

    await Currency.findByIdAndUpdate(data.wallet.currencyId, {
      $inc: {
        totalDeposit: req.body.amount * 1,
      },
    });

    startActiveDeposit(
      activeDeposit,
      earning,
      data.planDuration * 1,
      data.planCycle * 1,
      data.user,
      next
    );

    sendTransactionEmail(
      data.user,
      `${req.body.transactionType}-approval`,
      req.body.amount,
      next
    );

    next();
  } else {
    if (data.fromBalance == "true") {
      const wallet = await Wallet.findById(data.walletId);
      if (data.amount > wallet.balance) {
        return next(
          new AppError(
            `You have insufficient fund in this ${wallet.name} wallet`,
            404
          )
        );
      }

      await Wallet.findByIdAndUpdate(data.walletId, {
        $inc: {
          balance: data.amount * -1,
          totalDeposit: data.amount * 1,
          pendingDeposit: data.amount * -1,
        },
      });

      await User.findByIdAndUpdate(data.user._id, {
        $inc: { totalBalance: data.amount * -1 },
      });

      data.reinvest = true;
      data.status = true;
      await Transaction.create(data);

      data.planDuration = data.planDuration * 24 * 60 * 60 * 1000;
      data.daysRemaining = data.planDuration;
      data.serverTime = new Date().getTime();
      const earning = Number((data.amount * data.percent) / 100).toFixed(2);
      data.earning = 0;
      const activeDeposit = await Active.create(data);

      await Currency.findByIdAndUpdate(wallet.currencyId, {
        $inc: {
          totalDeposit: req.body.amount * 1,
        },
      });

      startActiveDeposit(
        activeDeposit,
        earning,
        data.planDuration * 1,
        data.planCycle * 1,
        data.user,
        next
      );
    } else {
      const wallet = await Wallet.findById(data.walletId);

      data.planDuration = duration;
      data.daysRemaining = duration;
      if (data.transactionType == "withdrawal") {
        if (data.amount > wallet.balance) {
          return next(
            new AppError(
              `You have insufficient fund in this ${wallet.name} wallet`,
              404
            )
          );
        }

        await Transaction.create(data);

        await Wallet.findByIdAndUpdate(data.walletId, {
          $inc: {
            pendingWithdrawal: data.amount,
            balance: data.amount * -1,
            totalWithdrawal: data.amount * 1,
          },
        });

        await User.findOneAndUpdate(
          { username: data.user.username },
          { $inc: { totalBalance: req.body.amount * -1 } }
        );
      } else {
        await Transaction.create(data);

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
    }

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
  if (activeResult) {
    await Wallet.findByIdAndUpdate(activeResult.walletId, {
      $inc: {
        balance: activeResult.amount,
      },

      $inc: {
        amountDeposited: activeResult.amount * -1,
      },
    });

    await User.findOneAndUpdate(
      { username: activeResult.username },
      {
        $inc: {
          totalBalance: activeResult.amount,
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
  interval,
  user,
  next
) => {
  let seconds = Math.floor((timeRemaining / 1000) % 60);
  let minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
  let hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);

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
        serverTime: new Date().getTime(),
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

    await User.findByIdAndUpdate(user._id, {
      $inc: { totalBalance: form.earning },
    });

    await Wallet.findByIdAndUpdate(activeDeposit.walletId, {
      $inc: {
        balance: form.earning,
      },
    });

    console.log(
      `The time remaining is ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`
    );

    if (Math.floor(timeRemaining / (60 * 1000)) <= 0) {
      console.log(`the time has elapsed completely`);
      deleteActiveDeposit(activeDeposit._id, 0, next);
      clearInterval(intervalId);
    }
  }, interval);
};

const finishInterruptedActiveDeposit = async (
  activeDeposit,
  earning,
  timeRemaining,
  interval,
  user,
  next
) => {
  const planCycle = activeDeposit.planCycle;

  setTimeout(async () => {
    const newTime = (activeDeposit.time += planCycle);

    await Active.updateOne(
      { _id: activeDeposit._id },
      {
        $inc: { earning: earning * 1, daysRemaining: -planCycle * 1 },
        time: newTime,
        serverTime: new Date().getTime(),
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

    timeRemaining -= planCycle;
    await Earning.create(form);

    await User.findByIdAndUpdate(user._id, {
      $inc: { totalBalance: form.earning },
    });

    await Wallet.findByIdAndUpdate(activeDeposit.walletId, {
      $inc: {
        balance: form.earning,
      },
    });

    const newActiveDeposit = await Active.findById(activeDeposit._id);

    startActiveDeposit(
      newActiveDeposit,
      earning,
      timeRemaining,
      newActiveDeposit.planCycle * 1,
      user,
      next
    );
  }, interval);
};

exports.approveDeposit = catchAsync(async (req, res, next) => {
  req.body.status = true;

  startRunningDeposit(req.body, req.params.id, "edit", next);

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
  const transaction = await Transaction.findByIdAndUpdate(req.params.id, {
    status: true,
  });

  const wallet = await Wallet.findById(transaction.walletId);

  await Wallet.findByIdAndUpdate(wallet._id, {
    $inc: {
      pendingWithdrawal: transaction.amount * -1,
    },
  });

  await Currency.findByIdAndUpdate(wallet.currencyId, {
    $inc: {
      totalWithdrawal: req.body.amount * 1,
    },
  });

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
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return next(new AppError("No transaction found with that ID", 404));
  }

  const wallet = await Wallet.findById(transaction.walletId);

  if (transaction.transactionType == "withdrawal") {
    await Wallet.findByIdAndUpdate(wallet._id, {
      $inc: {
        pendingWithdrawal: transaction.amount * -1,
        balance: transaction.amount * 1,
        totalWithdrawal: transaction.amount * -1,
      },
    });

    await User.findOneAndUpdate(
      { username: transaction.username },
      { $inc: { totalBalance: transaction.amount * 1 } }
    );
  }

  if (transaction.transactionType == "deposit") {
    await Wallet.findByIdAndUpdate(wallet._id, {
      $inc: {
        pendingDeposit: transaction.amount * -1,
      },
    });
  }

  await Transaction.findByIdAndDelete(req.params.id);

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
  const activeDeposit = await Active.findByIdAndUpdate(req.params.id, {
    status: true,
  });
  const timeRemaining =
    activeDeposit.planCycle - (new Date().getTime() - activeDeposit.serverTime);

  const seconds = Math.floor((timeRemaining / 1000) % 60);
  const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);

  const user = await User.findOne({ username: activeDeposit.username });
  const earning = Number(
    (activeDeposit.amount * activeDeposit.percent) / 100
  ).toFixed(2);

  console.log(
    `Active deposit is reactivated and the time remaining is ${hours} hours, ${minutes} minutes and ${seconds} seconds.`
  );

  finishInterruptedActiveDeposit(
    activeDeposit,
    earning,
    activeDeposit.daysRemaining * 1,
    timeRemaining,
    user,
    next
  );
  next();
});

exports.createPayment = catchAsync(async (req, res, next) => {
  const { ipn_mode, ipn_type, ipn_id, status, custom } = req.body;

  // Process the payment status and update your application's data accordingly
  if (status === "100") {
    const transaction = await Transaction.findOne({ userID: custom });
    if (!transaction) {
      return next(new AppError("No record for this transaction", 404));
    }

    transaction.status = true;
    startRunningDeposit(transaction, transaction._id, "edit", next);
  } else {
    console.log(`Payment ID ${ipn_id} failed or has a different status`);
  }

  res.status(200).json({
    status: "success",
  });
});

const startRunningDeposit = async (data, id, type, next) => {
  const wallet = await Wallet.findById(data.walletId);
  const user = User.findOne({ username: data.username });

  await Wallet.findByIdAndUpdate(data.walletId, {
    $inc: {
      pendingDeposit: data.amount * -1,
      totalDeposit: data.amount * 1,
    },
  });

  data.status = true;
  if (type == "create") {
    await Transaction.create(data);
  } else {
    await Transaction.findByIdAndUpdate(id, { status: data.status });
  }

  data.planDuration = data.planDuration * 24 * 60 * 60 * 1000;
  data.daysRemaining = data.planDuration * 1;
  data.serverTime = new Date().getTime();
  const earning = Number((data.amount * data.percent) / 100).toFixed(2);
  data.earning = 0;
  const activeDeposit = await Active.create(data);

  await Currency.findByIdAndUpdate(wallet.currencyId, {
    $inc: {
      totalDeposit: req.body.amount * 1,
    },
  });

  startActiveDeposit(
    activeDeposit,
    earning,
    data.planDuration * 1,
    data.planCycle * 1,
    user,
    next
  );

  sendTransactionEmail(
    data.user,
    `${req.body.transactionType}-approval`,
    req.body.amount,
    next
  );
};

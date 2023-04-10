const Transaction = require("../models/transactionModel");
const Active = require("../models/activeModel");
const Wallet = require("../models/walletModel");
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
  if (data.fromBalance == "true") {
    data.reinvest = true;
  }
  const result = await Transaction.create(data);

  if (!data.autoTransact) {
    sendTransactionEmail(data.user, data.transactionType, data.amount, next);

    // notificationController.createNotification(
    //   data.user.username,
    //   data.transactionType,
    //   data.date,
    //   data.dateCreated
    // );
  }

  res.status(200).json({
    status: "success",
    data: result,
  });
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

const deleteActiveDeposit = async (id, time) => {
  const activeResult = await Active.findById(id);
  await Wallet.findOneAndUpdate(
    { currencyId: activeResult.walletId },
    {
      $inc: {
        balance:
          activeResult.earning * 1 +
          Number((activeResult.amount * activeResult.percent * time) / 100),
      },
    }
  );
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
};

const startActiveDeposit = async (
  activeDeposit,
  earning,
  duration,
  interval
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
      deleteActiveDeposit(activeDeposit._id, 0);
      clearInterval(intervalId);
    }
  }, interval);
};

exports.checkActive = async () => {
  const deposits = await Active.find();
  deposits.forEach((el) => {
    if (el.time * 1 + el.planDuration * 1 < new Date().getTime()) {
      const time = Math.floor(el.daysRemaining / el.planCycle);
      deleteActiveDeposit(el._id, time);
    }
  });
};

exports.approveTransaction = catchAsync(async (req, res, next) => {
  req.body.status = true;
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  if (!req.body.reinvest) {
    await Wallet.findOneAndUpdate(
      { username: req.body.username, currencyId: req.body.walletId },
      { $inc: { balance: req.body.amount } }
    );
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
    req.body.planCycle * 1
  );

  // const user = await User.findOne({ username: form.account.username });
  // let oldAmount = result.balance;

  // if (form.transactionType == "deposit") {
  //   amount = oldAmount * 1 + form.amount * 1;
  // }

  // if (
  //   form.transactionType == "withdrawal" ||
  //   form.transactionType == "internal"
  // ) {
  //   amount = oldAmount * 1 - form.amount * 1;
  // }

  // form.status = !form.status;

  // await Transaction.findByIdAndUpdate(req.params.id, form, {
  //   new: true,
  //   runValidators: true,
  //   useFindAndModify: false,
  // });
  // await User.findByIdAndUpdate(
  //   user._id,
  //   { totalBalance: amount },
  //   {
  //     new: true,
  //     runValidators: true,
  //     useFindAndModify: false,
  //   }
  // );

  // const email = await Email.findOne({
  //   name: `${form.transactionType}-approval`,
  // });

  // notificationController.createNotification(
  //   user.username,
  //   `${form.transactionType}-approval`,
  //   form.date,
  //   form.dateCreated,
  //   ""
  // );

  // sendTransactionEmail(user, email.name, form.amount, "", account);

  // if (form.transactionType == "internal-transfer") {
  //   receiver = await User.findOne({ username: form.receiverUsername });
  //   let receiverAccount = await Account.findOne({
  //     username: form.receiverUsername,
  //   });
  //   let receiverBalance = receiverAccount.balance;

  //   let newBalance = receiverBalance * 1 + form.amount;

  //   await Account.findByIdAndUpdate(receiverAccount._id, {
  //     balance: newBalance,
  //   });

  //   const email = await Email.findOne({
  //     name: `credit-approval`,
  //   });

  //   notificationController.createNotification(
  //     receiver.username,
  //     `credit-approval`,
  //     form.date,
  //     form.dateCreated,
  //     form.username
  //   );

  //   sendTransactionEmail(receiver, email.name, form.amount, "", account);
  // }

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
      email.warning,
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

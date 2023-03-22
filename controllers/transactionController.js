const Transaction = require("../models/transactionModel");
const Currency = require("../models/currencyModel");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Account = require("../models/accountsModel");
const Email = require("../controllers/emailController");
const Notification = require("../models/notificationModel");
const notificationController = require("../controllers/notificationController");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createTransaction = catchAsync(async (req, res, next) => {
  const allowedFields = req.body;

  allowedFields.account = allowedFields.account;

  if (allowedFields.setPin) {
    const user = await User.updateOne(
      { username: allowedFields.user.username },
      { $set: { pin: allowedFields.newPin } }
    );

    allowedFields.newPin = undefined;
    allowedFields.confirmPin = undefined;

    Email.sendTransactionEmail(
      allowedFields.user,
      "Pin Creation",
      allowedFields.amount,
      user.pin,
      next
    );
  }

  if (
    allowedFields.transactionType == "Withdrawal" ||
    allowedFields.transactionType == "Transfer"
  ) {
    if (allowedFields.account.balance < allowedFields.amount) {
      return next(
        new AppError("You have operated more than your account balance", 401)
      );
    }
  }

  const symbol = await Currency.find();

  allowedFields.symbol = symbol[0].symbol;

  await Transaction.create(allowedFields);

  Email.sendTransactionEmail(
    allowedFields.user,
    allowedFields.transactionType,
    allowedFields.amount,
    "",
    next
  );

  notificationController.createNotification(
    allowedFields.user.username,
    allowedFields.transactionType,
    allowedFields.time
  );

  res.status(200).json({
    status: "success",
    data: "",
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
    length: resultLen.length,
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

exports.approveTransaction = catchAsync(async (req, res, next) => {
  let amount = 0;
  let oldAmount;
  const name = req.body.account.name;

  let allowedFields = req.body;
  const user = await User.findOne({ username: allowedFields.username });

  const getBalance = () => {
    user.accounts.forEach((el) => {
      if (el.name == name) {
        oldAmount = el.balance;
        return el;
      }
    });
  };

  getBalance();

  if (allowedFields.transactionType == "Deposit") {
    amount = Number(oldAmount) + Number(allowedFields.amount);
  }

  if (
    allowedFields.transactionType == "Withdrawal" ||
    allowedFields.transactionType == "Transfer"
  ) {
    amount = Number(oldAmount) - Number(allowedFields.amount);
  }

  allowedFields.status = !allowedFields.status;

  await Transaction.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  const setBalance = () => {
    user.accounts.forEach((el) => {
      if (el.name == name) {
        el.balance = amount;
      }
    });
  };

  setBalance();

  await User.findByIdAndUpdate(
    user._id,
    { accounts: user.accounts },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  notificationController.createNotification(
    user.username,
    `${allowedFields.transactionType} Approval`
  );

  res.status(200).json({
    status: "success",
  });
});

exports.deleteTransaction = catchAsync(async (req, res, next) => {
  const filesToDelete = [];

  const transaction = await Transaction.findById(req.params.id);

  await Transaction.findByIdAndDelete(req.params.id);

  if (!transaction) {
    return next(new AppError("No transaction found with that ID", 404));
  }

  req.fileNames = filesToDelete;

  next();
});

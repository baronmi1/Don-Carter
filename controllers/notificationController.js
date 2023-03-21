const Notification = require("../models/notificationModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getNotifications = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Notification.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const notifications = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: notifications,
    length: resultLen.length,
  });
});

exports.createNotification = async (username, transactionType, time) => {
  const withdrawalNotice = `Hello ${username}, you have made withdrawal transaction,
  the transaction will be processed automatically with a maximum processing time of 24 hours and you will be notified once the transaction is confirmed.
  Please contact us for any issue.`;

  const depositNotice = `Hello ${username}, you have made deposit transaction,
  the transaction will be processed automatically with a maximum processing time of 24 hours and you will be notified once the transaction is confirmed.
  Please contact us for any issue.`;

  const transferNotice = `Hello ${username}, you have made a transfer to a Zivik user,
  the transaction will be processed automatically with a maximum processing time of 24 hours and you will be notified once the transaction is confirmed.
  Please contact us for any issue.`;

  const depositApproval = `Hello ${username}, your last deposit transaction has been approved and your account credited,
thanks for choosing Zivik Bank.`;

  const getTransctionMsg = () => {
    if (transactionType == "Withdrawal") {
      return withdrawalNotice;
    } else if (transactionType == "Deposit") {
      return depositNotice;
    } else if (transactionType == "Deposit Approval") {
      return depositApproval;
    } else if (transactionType == "Transfer") {
      return transferNotice;
    }
  };

  const notice = {
    username: username,
    message: getTransctionMsg(),
    subject: `${transactionType} Notice`,
    dateCreated: time,
  };

  await Notification.create(notice);
};

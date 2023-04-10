const { token } = require("morgan");
const User = require("../models/userModel");
const Related = require("../models/relatedModel");
// const Account = require("../models/accountsModel");
// const Transaction = require("../models/transactionModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const Email = require("../models/emailModel");
const Company = require("../models/companyModel");
const SendEmail = require("../utils/email");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // 1A) FILTERING

  // 2) SORTING

  // 3) FIELDS

  // 4) PAGINATION

  const result = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const users = await features.query.clone();

  res.status(200).json({
    status: "success",
    length: resultLen.length,
    data: users,
  });
});

exports.getAUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.editUser = catchAsync(async (req, res, next) => {
  let files = [];
  const oldUser = await User.findById(req.params.id);

  if (req.files.profilePicture) {
    if (req.files.profilePicture) {
      req.body.profilePicture = req.files.profilePicture[0].filename;
      files.push(oldUser.profilePicture);
    }
    if (req.files.idPicture) {
      req.body.idPicture = req.files.idPicture[0].filename;
      files.push(oldUser.idPicture);
    }
  }

  req.body.password = undefined;
  req.body.cPassword = undefined;

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // runValidators: true,
  });

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  if (req.body.emailOption == "Yes") {
    const companyResult = await Company.find();
    const company = companyResult[0];
    const email =
      Number(req.body.withdraw) > 0
        ? await Email.findOne({ template: "withdrawal-approval" })
        : await Email.findOne({ template: "deposit-approval" });

    const content = email.content
      .replace("{{full-name}}", `${user.firstName} ${user.lastName}`)
      .replace("{{amount}}", req.body.amount);
    const domainName = company.companyDomain;
    const resetURL = "";
    const from = company.systemEmail;

    try {
      const banner = `${domainName}/uploads/${email.banner}`;
      new SendEmail(
        from,
        user,
        email.name,
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
  }

  req.fileNames = files;

  req.user = user;

  next();
});

exports.getRelatedData = catchAsync(async (req, res, next) => {
  const related = await Related.findOne({ username: req.params.username });

  if (!related) {
    return next(new AppError("No user found with that username", 404));
  }
  res.status(200).json({
    status: "success",
    data: related,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  await Related.findOneAndDelete({ username: user.username });
  await Account.findOneAndDelete({ username: user.username });
  await Transaction.deleteMany({
    $or: [{ username: user.username, receiverUsername: user.username }],
  });

  next();
});

exports.fetchUsers = (io, socket) => {
  socket.on("fetchUsers", async (item) => {
    const limit = item.limit;
    const users = await User.find({
      username: { $regex: item.keyWord, $options: "$i" },
      firstName: { $regex: item.keyWord, $options: "$i" },
    }).limit(limit);
    io.emit("fetchedUsers", users);
  });
};

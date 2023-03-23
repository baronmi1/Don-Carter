const { token } = require("morgan");
const User = require("../models/userModel");
const Account = require("../models/accountsModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const { ObjectId } = require("mongodb");

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
    lenth: resultLen.length,
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

  if (req.body.accounts) {
    let accounts = JSON.parse(req.body.accounts);
    accounts.forEach((el) => {
      if (el.id == undefined || el.id == "") {
        el.id = new ObjectId();
      }
    });
    req.body.accounts = accounts;
  }

  if (req.files) {
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

  req.fileNames = files;

  req.user = user;

  next();
});

exports.searchUser = async (req, res) => {
  const account = await Account.findOne({
    accountNumber: req.params.number,
  });
  res.status(200).json({
    status: "success",
    account: account,
  });
};

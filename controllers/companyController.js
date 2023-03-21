const Company = require("../models/companyModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createCompany = catchAsync(async (req, res, next) => {
  const check = await Company.find();
  let company;

  const allowedFields = {
    systemEmail: req.body.systemEmail,
    companyName: req.body.companyName,
    socials: JSON.parse(req.body.socials),
    coloredSocials: JSON.parse(req.body.coloredSocials),
    media: JSON.parse(req.body.media),
    coloredMedia: JSON.parse(req.body.coloredMedia),
    companyBank: req.body.companyBank,
    accountNumber: req.body.accountNumber,
    routingNumber: req.body.routingNumber,
    accountName: req.body.accountName,
  };

  if (check.length > 0) {
    company = await Company.findByIdAndUpdate(check[0]._id, allowedFields, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  } else {
    company = await Company.create(allowedFields);
  }

  res.status(200).json({
    status: "success",
    data: company,
  });
});

exports.getCompany = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Company.find(), req.query)
    .filter()
    .sort()
    .limitFields();
  const resultLen = await result.query;
  const features = result.paginate();

  const company = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: company,
    length: resultLen,
  });
});

exports.setBannerCategory = catchAsync(async (req, res, next) => {
  const check = await Company.find();
  let company;

  if (check.length > 0) {
    company = await Company.findByIdAndUpdate(check[0]._id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  }

  res.status(200).json({
    status: "success",
    data: company,
  });
});

exports.setAbout = catchAsync(async (req, res, next) => {
  const check = await Company.find();
  let company;

  if (check.length > 0) {
    company = await Company.findByIdAndUpdate(check[0]._id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  }

  res.status(200).json({
    status: "success",
    data: company,
  });
});

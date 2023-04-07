const Email = require("../models/emailModel");
const Company = require("../models/companyModel");
const SendEmail = require("../utils/email");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createEmail = catchAsync(async (req, res, next) => {
  const { doc1, doc2, doc3, doc4, doc5, doc6, doc7, doc8, doc9 } = req.body;

  await Email.create([doc1, doc2, doc3, doc4, doc5, doc6, doc7, doc8, doc9]);

  next();
});

exports.getEmails = catchAsync(async (req, res) => {
  const result = new APIFeatures(Email.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const email = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: email,
    resultLength: resultLen.length,
  });
});

exports.updateEmail = catchAsync(async (req, res, next) => {
  let filesToDelete = [];
  let allowedFields = req.body;

  if (req.file) {
    allowedFields.banner = req.file.filename;
    const oldEmail = await Email.findById(req.params.id);
    filesToDelete.push(oldEmail.banner);
  }

  await Email.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.fileNames = filesToDelete;

  next();
});

exports.sendEmail = catchAsync(async (req, res, next) => {
  const { users, email } = req.body;

  const from = `info@zivikbank.com`;

  users.forEach((user) => {
    try {
      const resetURL = `${req.protocol}://${req.get("host")}/${req.url}`;
      const banner = `${req.protocol}://${req.get("host")}/${req.url}/uploads/${
        email.banner
      }`;
      new SendEmail(
        from,
        user,
        email.name,
        email.title,
        banner,
        email.content,
        email.headerColor,
        email.footerColor,
        email.mainColor,
        email.greeting,
        email.warning
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

  res.status(200).json({
    status: "success",
  });
});

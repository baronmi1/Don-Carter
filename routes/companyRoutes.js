const express = require("express");
const companyController = require("../controllers/companyController");
const upload = require("../config/multer");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/set-banner").post(companyController.setBannerCategory);
router.route("/about-company").post(companyController.setAbout);

router
  .route("/")
  .post(upload.upload.single("image"), companyController.createCompany)
  .get(companyController.getCompany);

module.exports = router;

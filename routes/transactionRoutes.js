const express = require("express");
const transactionController = require("../controllers/transactionController");
const notificationController = require("../controllers/notificationController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const router = express.Router();

// router.route("/toggle-status/:id").patch(
//   // authController.protect,
//   transactionController.toggleCurrencyStatus
// );

router.get("/notifications", notificationController.getNotifications);
router.get("/get-volumes", transactionController.getTransactionVolume);

router
  .route("/")
  .post(authController.protect, transactionController.createTransaction)
  .get(authController.protect, transactionController.getTransactions);

router
  .route("/:id")
  .patch(
    authController.protect,
    transactionController.approveTransaction,
    transactionController.getTransactions
  )
  .delete(
    // authController.protect,
    // authController.restrictTo("room"),
    transactionController.deleteTransaction,
    transactionController.getTransactions
  );

module.exports = router;

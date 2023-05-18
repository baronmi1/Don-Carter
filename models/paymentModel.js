const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  symbol: String,
  username: String,
  amount: Number,
  earning: Number,
  planName: String,
  planDuration: Number,
  planPeriod: Number,
  percent: Number,
  planCycle: Number,
  daysRemaining: Number,
  referredBy: String,
  serverTime: Number,
  walletName: String,
  walletId: String,
  time: Number,
  userID: String,
  status: {
    type: Boolean,
    default: false,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;

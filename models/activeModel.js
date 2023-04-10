const mongoose = require("mongoose");

const activeSchema = new mongoose.Schema({
  symbol: String,
  username: String,
  amount: Number,
  earning: Number,
  planName: String,
  planDuration: Number,
  planPeriod: Number,
  percent: Number,
  daysRemaining: Number,
  walletName: String,
  walletId: String,
  time: Number,
});

const Active = mongoose.model("Active", activeSchema);

module.exports = Active;

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  symbol: String,
  username: String,
  account: Object,
  amount: Number,
  transactionType: String,
  receiverName: String,
  receiverBank: String,
  receiverAddress: String,
  receiverUsername: String,
  narration: String,
  date: String,
  status: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Number,
    default: new Date().getTime(),
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;

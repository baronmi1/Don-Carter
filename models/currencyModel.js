const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  symbol: String,
  name: String,
  address: String,
  description: String,
  status: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Number,
    default: new Date().getTime(),
  },
});

const Currency = mongoose.model("Currency", currencySchema);

module.exports = Currency;

const mongoose = require("mongoose");
const validator = require("validator");

const companySchema = new mongoose.Schema({
  staffPositions: Array,
  aboutText: String,
  certificate: String,
  socials: Array,
  coloredSocials: Array,
  media: Array,
  coloredMedia: Array,
  companyName: String,
  bannerCategories: Array,
  accountNumber: Number,
  accountName: String,
  routingNumber: String,
  companyBank: String,
  systemEmail: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;

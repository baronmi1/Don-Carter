const mongoose = require("mongoose");
const validator = require("validator");

const companySchema = new mongoose.Schema({
  socials: Array,
  coloredSocials: Array,
  media: Array,
  coloredMedia: Array,
  companyName: String,
  bannerCategories: Array,
  companyDomain: String,
  systemEmail: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;

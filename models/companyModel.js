const mongoose = require("mongoose");
const validator = require("validator");

const companySchema = new mongoose.Schema({
  systemEmail: {
    type: String,
    trim: true,
    lowercase: true,
  },
  socials: Array,
  coloredSocials: Array,
  media: Array,
  coloredMedia: Array,
  companyName: String,
  bannerCategories: Array,
  companyDomain: String,
  dayStarted: Number,
  onlineMembers: Number,
  totalMembers: Number,
  activeMembers: Number,
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;

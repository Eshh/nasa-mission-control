const mongoose = require("mongoose");

const launchSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  customers: {
    type: [String],
    required: false,
  },
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: String,
    required: true,
    default: true,
  },
});

// launches colelction
const launcheModel = mongoose.model("Launch", launchSchema);
module.exports = {
  launcheModel,
};

const mongoose = require("mongoose");

const upSchema = new mongoose.Schema({
  addedAt: {
    default: () => new Date(),
    type: Date
  },
  userid: {
    type: String,
  },
  type: {
    type: Number,
  },
  time: {
    type: Number,
    default: 0,
  },
  // This is used for guild only
  total: {
    type: Number,
  }
});

module.exports = mongoose.model("Staff", upSchema);
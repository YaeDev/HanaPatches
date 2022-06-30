const mongoose = require("mongoose");

const upSchema = new mongoose.Schema({
  addedAt: {
    default: () => new Date(),
    type: Date
  },
  userid: {
    type: String,
  },
  reason: {
    type: String,
  },
  time: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
  }
});

module.exports = mongoose.model("Ausencias", upSchema);
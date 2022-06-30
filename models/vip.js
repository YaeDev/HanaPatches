const mongoose = require("mongoose");

const upSchema = new mongoose.Schema({
  addedAt: {
    default: () => new Date(),
    type: Date
  },
  userid: {
    type: String,
    unique: true,
  },
  type: {
    type: Number,
  },
  time: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("VIP", upSchema);
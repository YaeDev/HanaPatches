const mongoose = require("mongoose");

const upSchema = new mongoose.Schema({
  addedAt: {
    default: () => new Date(),
    type: Date
  },

  // This is used for users only
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
  key: {
    type: String,
  }
});

module.exports = mongoose.model("Chaves", upSchema);
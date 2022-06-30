const mongoose = require("mongoose");

const upSchema = new mongoose.Schema({
  addedAt: {
    default: () => new Date(),
    type: Date
  },

  // This is used for guild only
    guildid: {
    type: String,
  },
  total: {
    type: Number,
  }
});

module.exports = mongoose.model("Engine", upSchema);
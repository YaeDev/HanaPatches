const mongoose = require("mongoose");

const upSchema = new mongoose.Schema({
  addedAt: {
    default: () => new Date(),
    type: Date
  },

  // This is used for guild only
    userid: {
    type: String,
  },
  badge: {
    type: Array,
  },
  time: {
    type: Number,
    default: 0,
  },
  marry: {
    type: String,
    default: null
  },
  ring: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Profile", upSchema);
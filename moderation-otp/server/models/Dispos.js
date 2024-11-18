const mongoose = require("mongoose");

const DispoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  resourceId: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Dispos", DispoSchema);

const mongoose = require("mongoose");

const DispoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  resourceId: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
    unique: true,
  },
  end: {
    type: String,
    required: true,
  },
  title: [String],
  color: { type: String, required: false },
});

module.exports = mongoose.model("Dispos", DispoSchema); // Utilisation correcte de DispoSchema

const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  competition: {
    name: String,
    // d'autres champs si nécessaire
  },
  date: {
    date: String,
  },
});

module.exports = mongoose.model("Match", MatchSchema);

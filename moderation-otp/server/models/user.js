const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  roles: [String],
  nick: { type: String, required: false, unique: true },
});

module.exports = mongoose.model("User", UserSchema);

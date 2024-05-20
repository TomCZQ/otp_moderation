const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("Attempting to find user:", username);
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return res.status(401).send("Invalid credentials");
    }

    console.log("User found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("Login successful");
    res.json({ token });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).send("Login failed");
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (err) {
    console.error("Failed to get user details:", err);
    res.status(500).send("Failed to get user details");
  }
};

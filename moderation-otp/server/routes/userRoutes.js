const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const discordController = require("../controllers/discordController");
const { authenticateToken } = require("../middleware/auth");
const { loginUserValidator } = require("../validator/user");
const { runValidation } = require("../validator");

router.get("/members", discordController.getMembers);

router.post(
  "/login",
  loginUserValidator,
  runValidation,
  userController.loginUser
);

router.get("/me", authenticateToken, userController.getUserDetails);

module.exports = router;

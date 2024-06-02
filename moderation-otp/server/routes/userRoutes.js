const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const discordController = require("../controllers/discordController");
const { authenticateToken } = require("../middleware/auth");
const { loginUserValidator } = require("../validator/User.js"); // Le nom du fichier est sensible à la casse
const { runValidation } = require("../validator/index.js");
const { disposValidator } = require("../validator/Dispos.js");

router.get("/members", discordController.getMembers);

router.post(
  "/login",
  loginUserValidator,
  runValidation,
  userController.loginUser
);

router.get(
  "/me",
  disposValidator,
  authenticateToken,
  userController.getUserDetails
);

module.exports = router;

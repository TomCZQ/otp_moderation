const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const discordController = require("../controllers/discordController");
const { authenticateToken } = require("../middleware/auth");
const { loginUserValidator } = require("../validator/user"); // Le nom du fichier est sensible à la casse
const { runValidation } = require("../validator/index");
const { disposValidator } = require("../validator/Dispos");

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

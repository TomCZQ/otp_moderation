const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const discordController = require("../controllers/discordController");
const { authenticateToken } = require("../middleware/auth");
const { index } = require("../validator/index");
router.get("/members", discordController.getMembers);

router.post("/login", index.runValidation, userController.loginUser);

router.get(
  "/me",

  authenticateToken,
  userController.getUserDetails
);

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const discordController = require("../controllers/discordController");
const { authenticateToken } = require("../middleware/auth");

router.get("/members", discordController.getMembers);

//router.get("/matches", matchesController.getMatches);

router.post("/login", userController.loginUser);

router.get("/me", authenticateToken, userController.getUserDetails);

module.exports = router;

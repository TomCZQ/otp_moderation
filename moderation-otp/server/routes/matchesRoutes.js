const express = require("express");
const router = express.Router();
const matchesController = require("../controllers/matchesController.js");

router.get("/matches", matchesController.getMatches);

module.exports = router;

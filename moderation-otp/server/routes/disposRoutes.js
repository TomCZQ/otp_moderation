const express = require("express");
const router = express.Router();
const disposController = require("../controllers/disposController.js");
const { authenticateToken } = require("../middleware/authenticateToken");

router.get("/dispos", disposController.getDispos);
router.post("/dispos", authenticateToken, disposController.createDispo); // Protégé par JWT
router.delete("/dispos", authenticateToken, disposController.deleteDispos); // Changez la route DELETE pour accepter le corps de la requête
module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');

// Route pour la connexion des utilisateurs
router.post('/login', userController.loginUser);

// Route protégée pour les utilisateurs authentifiés
router.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;

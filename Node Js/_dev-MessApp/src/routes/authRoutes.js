const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isGuest, isAuthenticated  } = require('../middlewares/authMiddleware');

router.get('/register', isGuest, authController.showRegisterPage);
router.post('/register', isGuest, authController.registerUser);

router.get('/login', isGuest, authController.showLoginPage);
router.post('/login', isGuest, authController.loginUser);

router.post('/logout', isAuthenticated, authController.loginUser);

module.exports = router;
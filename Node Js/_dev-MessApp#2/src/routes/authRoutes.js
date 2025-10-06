const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController');
const { isGuest } = require('../middlewares/authMiddleware');

routes.get('/login', isGuest, authController.showLoginPage);
routes.post('/login', isGuest, authController.loginUser);

routes.get('/register', isGuest, authController.showRegisterPage);
routes.post('/register', isGuest, authController.registerUser);

routes.get('/logout', isGuest, authController.logoutUser);

module.exports = routes;
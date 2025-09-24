const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController');
const { isGuest } = require('../middlewares/authMiddleware');

routes.get('/login', isGuest, authController.showLoginPage);
routes.post('/login', isGuest, authController.loginUser);

module.exports = routes;
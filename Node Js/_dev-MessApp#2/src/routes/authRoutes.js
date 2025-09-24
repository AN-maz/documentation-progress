const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController');

routes.get('/login', authController.showLoginPage);
routes.post('/login', authController.loginUser);

module.exports = routes;
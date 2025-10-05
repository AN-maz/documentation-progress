const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/home', homeController.showHome);

module.exports = router;
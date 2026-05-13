const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutrition.controller.js');

router.post('/report', nutritionController.saveMenu);

module.exports = router;
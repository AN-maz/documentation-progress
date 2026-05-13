const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budget.controller.js');

router.post('/allocate', budgetController.allocateBudget);

module.exports = router;
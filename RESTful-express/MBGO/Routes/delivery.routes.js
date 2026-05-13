const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/delivery.controller');
const { checkPejabatBanner } = require('../middlewares/auditFilter.js');

router.post('/confirm', checkPejabatBanner, deliveryController.confirmDelivery);

module.exports = router;
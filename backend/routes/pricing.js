const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');

router.get('/', pricingController.getPackages);
router.get('/:id', pricingController.getPackage);

module.exports = router;
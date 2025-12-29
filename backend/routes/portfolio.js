const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.get('/', portfolioController.getProjects);
router.get('/:id', portfolioController.getProject);

module.exports = router;
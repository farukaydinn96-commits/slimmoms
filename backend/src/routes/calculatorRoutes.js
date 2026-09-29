const express = require('express');
const router = express.Router();

const calculatorController = require('../controllers/calculatorController');

router.post('/', calculatorController.calculateCalories);

module.exports = router;

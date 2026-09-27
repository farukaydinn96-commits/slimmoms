const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const {
  calculateCalories,
  calculateCaloriesPrivate,
} = require('../controllers/calculatorController');

const router = express.Router();

// Public
router.post('/', calculateCalories);

// Private
router.post('/private', authenticate, calculateCaloriesPrivate);

module.exports = router;
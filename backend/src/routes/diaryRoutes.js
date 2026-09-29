const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');

router.get('/:date', diaryController.getDiaryByDate);
router.post('/', diaryController.addProductToDiary);
router.delete('/:id', diaryController.deleteProductFromDiary);

module.exports = router;

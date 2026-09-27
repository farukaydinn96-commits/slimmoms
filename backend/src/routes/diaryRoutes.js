const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const {
  addDiaryProduct,
  deleteDiaryProduct,
  getDiaryByDate,
} = require('../controllers/diaryController');

const router = express.Router();

router.use(authenticate);

router.post('/add', addDiaryProduct);
router.delete('/:id', deleteDiaryProduct);
router.get('/:date', getDiaryByDate);

module.exports = router;

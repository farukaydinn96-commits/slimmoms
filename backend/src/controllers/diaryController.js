const diaryService = require('../services/diaryService');

const addDiaryProduct = async (req, res, next) => {
  try {
    const product = await diaryService.addDiaryProduct({
      userId: req.user.id,
      date: req.body.date,
      productId: req.body.productId,
      weight: req.body.weight,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const deleteDiaryProduct = async (req, res, next) => {
  try {
    await diaryService.deleteDiaryProduct({
      userId: req.user.id,
      id: req.params.id,
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getDiaryByDate = async (req, res, next) => {
  try {
    const diary = await diaryService.getDiaryByDate({
      userId: req.user.id,
      date: req.params.date,
    });

    res.status(200).json(diary);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addDiaryProduct,
  deleteDiaryProduct,
  getDiaryByDate,
};

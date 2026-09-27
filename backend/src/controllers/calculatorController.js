const calculatorService = require('../services/calculatorService');

const calculateCalories = async (req, res, next) => {
  try {
    const { height, desiredWeight, age, bloodType, currentWeight } = req.body;

    const result = calculatorService.calculateCalories({
      height,
      desiredWeight,
      age,
      bloodType,
      currentWeight,
    });

    const notRecommendedFoods =
      await calculatorService.getNotRecommendedFoods(bloodType);

    res.status(200).json({
      dailyRate: result.dailyRate,
      notRecommendedFoods,
    });
  } catch (error) {
    next(error);
  }
};

const calculateCaloriesPrivate = async (req, res, next) => {
  try {
    const { height, desiredWeight, age, bloodType, currentWeight } = req.body;

    const result = calculatorService.calculateCalories({
      height,
      desiredWeight,
      age,
      bloodType,
      currentWeight,
    });

    const notRecommendedFoods =
      await calculatorService.getNotRecommendedFoods(bloodType);

    res.status(200).json({
      dailyRate: result.dailyRate,
      notRecommendedFoods,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  calculateCalories,
  calculateCaloriesPrivate,
};
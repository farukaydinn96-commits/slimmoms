const Product = require('../models/Product');

const calculateCalories = ({
  height,
  desiredWeight,
  age,
  bloodType,
  currentWeight,
}) => {
  const dailyRate = Math.round(
    10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight)
  );

  return {
    dailyRate,
    bloodType,
  };
};

const getNotRecommendedFoods = async bloodType => {
  const products = await Product.find({
    [`groupBloodNotAllowed.${bloodType}`]: true,
  }).select('title calories weight');

  return products;
};

module.exports = {
  calculateCalories,
  getNotRecommendedFoods,
};
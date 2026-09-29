const calculateCalories = async (req, res, next) => {
  try {
    const { height, age, currentWeight, desiredWeight, bloodType } = req.body;

    if (!height || !age || !currentWeight || !desiredWeight || !bloodType) {
      return res
        .status(400)
        .json({ message: 'Lütfen tüm alanları eksiksiz doldurun.' });
    }

    const dailyRate = Math.round(
      10 * currentWeight +
        6.25 * height -
        5 * age -
        161 -
        10 * (currentWeight - desiredWeight)
    );

    let notRecommendedFoods = [];

    switch (Number(bloodType)) {
      case 1:
        notRecommendedFoods = [
          'Flour products',
          'Milk',
          'Red meat',
          'Smoked meats',
        ];
        break;
      case 2:
        notRecommendedFoods = [
          'Red meat',
          'Dairy products',
          'Potatoes',
          'Tomatoes',
        ];
        break;
      case 3:
        notRecommendedFoods = ['Chicken', 'Pork', 'Wheat', 'Corn'];
        break;
      case 4:
        notRecommendedFoods = ['Red meat', 'Buckwheat', 'Corn', 'Kidney beans'];
        break;
      default:
        notRecommendedFoods = ['Flour products', 'Milk', 'Sweets'];
    }

    return res.status(200).json({
      dailyRate,
      notRecommendedFoods,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  calculateCalories,
};

import { Product, User } from "../../models/index.js";
import { RequestError } from "../../helpers/index.js";

const dailyIntakeControllerForUser = async (req, res, next) => {
  const { age, height, currentWeight, desiredWeight, bloodType } = req.body;
  const { _id: id } = req.user;

  const dailyCaloriesCalculate = Math.round(
    10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight)
  );

  const result = await Product.find(
    {
      [`groupBloodNotAllowed.${bloodType}`]: true,
    },
    {
      title: 1,
      categories: 1,
    }
  );

  if (!result) {
    throw RequestError(404, "Not found");
  }

  const productCategories = result
    .flatMap((product) => product.categories || [])
    .filter((item, index, array) => array.indexOf(item) === index);

  const dailyIntake = {
    calories: dailyCaloriesCalculate,
    notAllowedProduct: result.map((product) => ({
      title: product.title?.ru || product.title?.ua || "Unknown title",
      category: product.categories && product.categories.length > 0 
        ? product.categories[0] 
        : "Unknown",
    })),
    categories: productCategories,
  };

  await User.findByIdAndUpdate(id, {
    personalData: {
      age,
      height,
      currentWeight,
      desiredWeight,
      bloodType,
    },
    dailyDiet: dailyIntake,
  });

  res.json(dailyIntake);
};

export default dailyIntakeControllerForUser;
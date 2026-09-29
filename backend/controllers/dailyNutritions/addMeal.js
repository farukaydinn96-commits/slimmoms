import { DailyNutrition, Product } from "../../models/index.js";
import { RequestError } from "../../helpers/index.js";

const addMeal = async (req, res) => {
  const { _id: owner } = req.user;
  const { product, grams } = req.body;


  const foundProduct = await Product.findOne({ title: product });

  if (!foundProduct || !foundProduct.calories) {
    throw RequestError(404, "This product does not exist in the database");
  }

  const cal = ((grams * foundProduct.calories) / 100).toFixed();

  const result = await DailyNutrition.create({
    ...req.body,
    calories: cal,
    owner,
  });

  res.status(201).json(result);
};

export default addMeal;

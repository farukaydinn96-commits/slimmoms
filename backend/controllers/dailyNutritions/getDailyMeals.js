import { DailyNutrition } from "../../models/index.js";
import { RequestError } from "../../helpers/index.js";

const getDailyMeals = async (req, res) => {
  const { _id } = req.user;
  const { date } = req.body;

  if (!date) {
    throw RequestError(400, "Date is required");
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const meals = await DailyNutrition.find({
    owner: _id,
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  res.status(200).json(meals);
};

export default getDailyMeals;

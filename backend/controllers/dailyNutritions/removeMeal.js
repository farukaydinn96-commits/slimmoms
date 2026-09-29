import { DailyNutrition } from "../../models/index.js";
import { RequestError } from "../../helpers/index.js";
import mongoose from "mongoose";

const removeMeal = async (req, res) => {
  const { mealId } = req.params;
  const { _id: userId } = req.user;


  if (!mongoose.Types.ObjectId.isValid(mealId)) {
    throw RequestError(400, "Invalid meal ID");
  }

  // 🔒 ștergere doar dacă aparține userului logat
  const result = await DailyNutrition.findOneAndDelete({
    _id: mealId,
    owner: userId,
  });

  if (!result) {
    throw RequestError(404, "Meal not found");
  }

  res.status(200).json({ message: "Meal deleted successfully" });
};

export default removeMeal;

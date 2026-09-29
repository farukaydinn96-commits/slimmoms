import express from "express";

import { validateBody, authenticate } from "../../middlewares/index.js";
import { ctrlWrapper } from "../../helpers/index.js";
import { mealSchema, dailyMealsSchema } from "../../schemas/index.js";
import * as ctrl from "../../controllers/index.js";

const router = express.Router();

router.post(
  "/addmeal",
  authenticate,
  validateBody(mealSchema),
  ctrlWrapper(ctrl.addMeal)
);

router.post(
  "/getdailymeals",
  authenticate,
  validateBody(dailyMealsSchema),
  ctrlWrapper(ctrl.getDailyMeals)
);

router.delete("/:mealId", authenticate, ctrlWrapper(ctrl.removeMeal));

export default router;

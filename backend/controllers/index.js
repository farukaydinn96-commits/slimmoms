import register from "./auth/register.js";
import login from "./auth/login.js";
import logout from "./auth/logout.js";
import refresh from "./auth/refresh.js";
import getCurrentUser from "./auth/getCurrentUser.js";

import addMeal from "./dailyNutritions/addMeal.js";
import removeMeal from "./dailyNutritions/removeMeal.js";
import getDailyMeals from "./dailyNutritions/getDailyMeals.js";

import findOneProduct from "./products/findOneProduct.js";
import dailyIntakeController from "./products/dailyIntakeController.js";
import dailyIntakeControllerForUser from "./products/dailyIntakeControllerForUser.js";

export {
  register,
  login,
  logout,
  refresh,
  getCurrentUser,
  addMeal,
  removeMeal,
  getDailyMeals,
  findOneProduct,
  dailyIntakeController,
  dailyIntakeControllerForUser,
};

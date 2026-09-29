// schemas/dailyNutrition.js
import Joi from "joi";

export const mealSchema = Joi.object({
  date: Joi.string().isoDate().required().messages({
    "string.base": "Date must be a string",
    "string.isoDate": "Date must be in ISO format (YYYY-MM-DD)",
    "any.required": "Date is required",
  }),
  product: Joi.string().required(),
  grams: Joi.number().integer().required(),
});

export const dailyMealsSchema = Joi.object({
  date: Joi.string().isoDate().required().messages({
    "string.base": "Date must be a string",
    "string.isoDate": "Date must be in ISO format (YYYY-MM-DD)",
    "any.required": "Date is required",
  }),
});

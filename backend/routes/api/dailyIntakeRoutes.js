import express from "express";
import * as controll from "../../controllers/index.js";
import { dailyIntakeJoiSchema } from "../../schemas/index.js";
import { ctrlWrapper } from "../../helpers/index.js";
import { validateBody, authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.post(
  "/",
  validateBody(dailyIntakeJoiSchema),
  ctrlWrapper(controll.dailyIntakeController)
);

router.post(
  "/user",
  authenticate,
  validateBody(dailyIntakeJoiSchema),
  ctrlWrapper(controll.dailyIntakeControllerForUser)
);

export default router;

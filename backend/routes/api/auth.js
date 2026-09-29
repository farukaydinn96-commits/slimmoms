import express from "express";
import { validateBody, authenticate } from "../../middlewares/index.js";
import { ctrlWrapper } from "../../helpers/index.js";
import { registerSchema, loginSchema } from "../../schemas/index.js";

import * as ctrl from "../../controllers/index.js";

const router = express.Router();


router.post(
  "/signup",
  validateBody(registerSchema),
  ctrlWrapper(ctrl.register)
);


router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));




router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));


router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

export default router;

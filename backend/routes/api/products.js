import express from "express";
import { authenticate } from "../../middlewares/index.js";
import { ctrlWrapper } from "../../helpers/index.js";
import findProductsByQuery from "../../controllers/products/findProductsByQuery.js";

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(findProductsByQuery));

export default router;

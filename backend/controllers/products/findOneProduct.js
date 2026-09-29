import { Product } from "../../models/index.js";

const findProductsByQuery = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res
      .status(400)
      .json({ message: "Query parameter 'q' is required" });
  }

  const result = await Product.find(
    { title: { $regex: q, $options: "i" } },
    { title: 1, weight: 1, calories: 1 }
  ).limit(20);

  if (result.length === 0) {
    return res.status(200).json({
      message: "No products found for your search.",
      products: [],
    });
  }

  res.status(200).json({ products: result });
};

export default findProductsByQuery;

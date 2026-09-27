const Product = require("../models/Product");

const searchProducts = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res
        .status(400)
        .json({ message: "Lütfen aranacak ürün adını (search) belirtin." });
    }

    const products = await Product.find({
      title: { $regex: search, $options: "i" },
    });

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Ürünler aranırken bir hata oluştu",
        error: error.message,
      });
  }
};

module.exports = { searchProducts };

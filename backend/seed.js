require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const Product = require("./src/models/Product");

const MONGO_URI = process.env.MONGO_URI;

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    await Product.deleteMany();

    let productsData = JSON.parse(fs.readFileSync("./products.json", "utf-8"));

    productsData = productsData.map((product) => {
      if (product._id && product._id.$oid) {
        product._id = product._id.$oid;
      }
      return product;
    });

    await Product.insertMany(productsData);

    process.exit();
  } catch (error) {
    console.error("Veri aktarımında hata oluştu:", error);
    process.exit(1);
  }
};

importData();

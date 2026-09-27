const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Ürün adı zorunludur"],
    },
    calories: {
      type: Number,
      required: [true, "Kalori değeri zorunludur"],
    },
    weight: {
      type: Number,
      default: 100,
    },
    groupBloodNotAllowed: {
      type: [Boolean],
    },
  },
  { versionKey: false, timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

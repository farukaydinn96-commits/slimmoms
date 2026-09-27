const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const calculatorRoutes = require("./routes/calculatorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/calculator", calculatorRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Aradığınız sayfa/endpoint bulunamadı" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Sunucu Hatası (Server error)" } = err;
  res.status(status).json({ message });
});

module.exports = app;

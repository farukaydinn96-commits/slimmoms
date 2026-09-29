require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Product = require('./src/models/Product');

const MONGO_URI = process.env.MONGO_URI;

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany();

    const rawData = fs.readFileSync('./products.json', 'utf-8');
    let productsData = JSON.parse(rawData);

    const cleanedData = productsData
      .filter(
        product =>
          product.calories !== undefined &&
          product.calories !== null &&
          product.title
      )
      .map(product => {
        if (product._id && product._id.$oid) {
          product._id = product._id.$oid;
        }
        return product;
      });

    await Product.insertMany(cleanedData);
    console.log(
      `Veritabanına ${cleanedData.length} adet kusursuz ürün başarıyla aktarıldı!`
    );

    process.exit();
  } catch (error) {
    console.error('Veri aktarımında hata oluştu:', error);
    process.exit(1);
  }
};

importData();

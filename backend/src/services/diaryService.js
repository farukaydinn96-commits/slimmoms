const Diary = require('../models/Diary');
const Product = require('../models/Product');

const formatEntry = entry => ({
  id: entry._id,
  title: entry.productId.title,
  weight: entry.weight,
  kcal: Math.round(
    (entry.productId.calories * entry.weight) / entry.productId.weight
  ),
});

const addDiaryProduct = async ({ userId, date, productId, weight }) => {
  const product = await Product.findById(productId);

  if (product === null) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  const entry = await Diary.create({
    userId,
    date,
    productId,
    weight,
  });

  await entry.populate('productId');

  return formatEntry(entry);
};

const deleteDiaryProduct = async ({ userId, id }) => {
  const entry = await Diary.findOneAndDelete({
    _id: id,
    userId,
  });

  if (entry === null) {
    const error = new Error('Diary entry not found');
    error.status = 404;
    throw error;
  }

  return entry;
};

const getDiaryByDate = async ({ userId, date }) => {
  const entries = await Diary.find({ userId, date }).populate('productId');
  const eatenProducts = entries.map(formatEntry);

  const kcalConsumed = eatenProducts.reduce(
    (total, product) => total + product.kcal,
    0
  );

  return {
    date,
    eatenProducts,
    daySummary: {
      kcalConsumed,
      kcalLeft: 0,
      dailyRate: 0,
    },
  };
};

module.exports = {
  addDiaryProduct,
  deleteDiaryProduct,
  getDiaryByDate,
};

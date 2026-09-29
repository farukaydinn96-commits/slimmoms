const Product = require('../models/Product');
const Diary = require('../models/Diary');

const getDiaryByDate = async (req, res, next) => {
  try {
    const { date } = req.params;
    const userId = req.user ? req.user._id : '64b1f4b8e4b0a1a2b3c4d5e6';

    const diary = await Diary.findOne({ date, owner: userId }).populate(
      'eatenProducts.product'
    );

    if (!diary) {
      return res.status(200).json({
        date,
        eatenProducts: [],
        daySummary: {
          kcalLeft: 2800,
          kcalConsumed: 0,
          dailyRate: 2800,
          percentsOfDailyRate: 0,
        },
      });
    }

    let totalKcal = 0;
    const formattedProducts = [];

    if (diary.eatenProducts && Array.isArray(diary.eatenProducts)) {
      diary.eatenProducts.forEach(item => {
        if (item.product && item.product.calories) {
          const itemKcal = Math.round(
            (item.product.calories * item.weight) / 100
          );
          totalKcal += itemKcal;
          formattedProducts.push({
            id: item._id,
            title: item.product.title,
            weight: item.weight,
            kcal: itemKcal,
          });
        }
      });
    }

    const dailyRate = 2800;

    return res.status(200).json({
      date,
      eatenProducts: formattedProducts,
      daySummary: {
        kcalLeft: dailyRate - totalKcal,
        kcalConsumed: totalKcal,
        dailyRate: dailyRate,
        percentsOfDailyRate: Math.round((totalKcal / dailyRate) * 100),
      },
    });
  } catch (error) {
    console.log('\n🚨 GET DIARY ÇÖKME SEBEBİ:', error);
    res.status(500).json({ message: 'GET DIARY HATASI: ' + error.message });
  }
};

const addProductToDiary = async (req, res, next) => {
  try {
    const { date, productId, weight } = req.body;
    const userId = req.user ? req.user._id : '64b1f4b8e4b0a1a2b3c4d5e6';

    if (!productId) {
      console.log("🚨 HATA: Frontend'den productId boş geldi!");
      return res
        .status(400)
        .json({ message: "Hata: Frontend'den productId boş geldi!" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      console.log('🚨 HATA: Ürün bulunamadı! ID:', productId);
      return res
        .status(404)
        .json({ message: 'Hata: Ürün veritabanında bulunamadı!' });
    }

    let diary = await Diary.findOne({ date, owner: userId });

    if (!diary) {
      diary = new Diary({
        date,
        owner: userId,
        eatenProducts: [{ product: productId, weight }],
      });
    } else {
      // KRİTİK KORUMA: Eğer veritabanında eskinden kalan bozuk bir kayıt varsa onu düzeltir
      if (!diary.eatenProducts) {
        diary.eatenProducts = [];
      }
      diary.eatenProducts.push({ product: productId, weight });
    }

    await diary.save();

    const updatedDiary = await Diary.findById(diary._id).populate(
      'eatenProducts.product'
    );

    let totalKcal = 0;
    let lastAddedItem = null;

    updatedDiary.eatenProducts.forEach(item => {
      if (item.product && item.product.calories) {
        totalKcal += Math.round((item.product.calories * item.weight) / 100);
        lastAddedItem = item;
      }
    });

    const dailyRate = 2800;

    res.status(201).json({
      eatenProduct: {
        id: lastAddedItem
          ? lastAddedItem._id
          : updatedDiary.eatenProducts[updatedDiary.eatenProducts.length - 1]
              ._id,
        title: product.title,
        weight,
        kcal: Math.round((product.calories * weight) / 100),
      },
      daySummary: {
        kcalLeft: dailyRate - totalKcal,
        kcalConsumed: totalKcal,
        dailyRate,
        percentsOfDailyRate: Math.round((totalKcal / dailyRate) * 100),
      },
    });
  } catch (error) {
    console.log('\n🚨 ÜRÜN EKLEME ÇÖKME SEBEBİ:', error);
    res.status(500).json({ message: 'ÜRÜN EKLEME HATASI: ' + error.message });
  }
};

const deleteProductFromDiary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user._id : '64b1f4b8e4b0a1a2b3c4d5e6';

    const diary = await Diary.findOne({
      'eatenProducts._id': id,
      owner: userId,
    });

    if (!diary) {
      return res.status(404).json({ message: 'Günlük kaydı bulunamadı' });
    }

    diary.eatenProducts = diary.eatenProducts.filter(
      item => item._id.toString() !== id
    );
    await diary.save();

    await diary.populate('eatenProducts.product');
    let totalKcal = 0;

    if (diary.eatenProducts) {
      diary.eatenProducts.forEach(item => {
        if (item.product && item.product.calories) {
          totalKcal += Math.round((item.product.calories * item.weight) / 100);
        }
      });
    }

    const dailyRate = 2800;

    res.status(200).json({
      message: 'Ürün silindi',
      newDaySummary: {
        kcalLeft: dailyRate - totalKcal,
        kcalConsumed: totalKcal,
        dailyRate,
        percentsOfDailyRate: Math.round((totalKcal / dailyRate) * 100),
      },
    });
  } catch (error) {
    console.log('\n🚨 ÜRÜN SİLME ÇÖKME SEBEBİ:', error);
    res.status(500).json({ message: 'ÜRÜN SİLME HATASI: ' + error.message });
  }
};

module.exports = {
  getDiaryByDate,
  addProductToDiary,
  deleteProductFromDiary,
};

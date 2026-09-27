const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controllers/productController");
const auth = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: İsme göre (query-string) ürün araması yapar
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *         description: Aranacak ürün adı (Örn; Elma)
 *     responses:
 *       200:
 *         description: Eşleşen ürünler listesi başarıyla getirildi
 *       401:
 *         description: Yetkisiz erişim
 */
// Arama rotasını koruma altına (auth) aldık, sadece giriş yapanlar ürün arayabilir
router.get("/", auth, searchProducts);

module.exports = router;

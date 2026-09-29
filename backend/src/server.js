require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const calculatorRoutes = require('./routes/calculatorRoutes');
const diaryRoutes = require('./routes/diaryRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SlimMom API Dokümantasyonu',
      version: '1.0.0',
      description: 'Takım için hazırlanan API uç noktaları',
    },
    servers: [
      {
        url: 'http://localhost:5001',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/diary', diaryRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Aradığınız sayfa/endpoint bulunamadı' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Sunucu Hatası (Server error)' } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Sunucu ${PORT} portunda başarıyla çalışıyor.`);
    });
  })
  .catch(err => {
    console.error('MongoDB Bağlantı Hatası:', err.message);
  });

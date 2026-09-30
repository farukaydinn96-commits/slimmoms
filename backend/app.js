import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from './swagger.js';
import authRouter from './routes/api/auth.js';
import productsRouter from './routes/api/products.js';
import dailyNutritionsRouter from './routes/api/dailyNutritions.js';
import dailyIntakeRouter from './routes/api/dailyIntakeRoutes.js';

dotenv.config();

const app = express();

const formatsLogger = process.env.NODE_ENV === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cookieParser());

const {
  CLIENT_URL = 'https://abiatar-cosma.github.io',
  DEV_CLIENT_URL = 'http://localhost:5173',
} = process.env;

const ALLOWED_ORIGINS = [CLIENT_URL, DEV_CLIENT_URL].filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);

      if (ALLOWED_ORIGINS.includes(origin)) {
        return cb(null, true);
      }

      return cb(new Error(`Blocked by CORS: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
  })
);

app.set('trust proxy', 1);

app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/dailynutritions', dailyNutritionsRouter);
app.use('/api/daily-intake', dailyIntakeRouter);

app.use('/public', express.static('public'));

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Server error';

  if (process.env.NODE_ENV !== 'production') {
    console.error(message);
  }

  res.status(status).json({ message });
});

export default app;

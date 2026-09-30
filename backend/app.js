import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import swaggerDocument from './swagger.js';

import authRouter from './routes/api/auth.js';
import productsRouter from './routes/api/products.js';
import dailyIntakeRouter from './routes/api/dailyIntakeRoutes.js';
import dailyNutritionsRouter from './routes/api/dailyNutritions.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://slimmoms.vercel.app',
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/users', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/dailyintake', dailyIntakeRouter);
app.use('/api/dailynutritions', dailyNutritionsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;

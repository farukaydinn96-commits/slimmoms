import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import { Session } from '../models/index.js';

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

const createTokens = async id => {
  if (!ACCESS_TOKEN_SECRET_KEY || !REFRESH_TOKEN_SECRET_KEY) {
    throw new Error('JWT secret keys are not defined in .env');
  }

  const payload = { id };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '1h',
  });

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: '7d',
  });

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await Session.create({
    userId: id,
    accessToken,
    refreshToken,
    expiresAt,
  });

  return { accessToken, refreshToken };
};

export default createTokens;

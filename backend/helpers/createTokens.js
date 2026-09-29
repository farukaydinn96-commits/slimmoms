import dotenv from "dotenv";
dotenv.config(); // Trebuie să fie înainte de accesarea process.env

import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

const createTokens = async (id) => {
  if (!ACCESS_TOKEN_SECRET_KEY || !REFRESH_TOKEN_SECRET_KEY) {
    throw new Error("JWT secret keys are not defined in .env");
  }

  const payload = { id };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "7d",
  });

  await User.findByIdAndUpdate(id, { accessToken, refreshToken });

  return { accessToken, refreshToken };
};

export default createTokens;

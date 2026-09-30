import jwt from 'jsonwebtoken';
import { Session } from '../../models/index.js';
import { RequestError, createTokens } from '../../helpers/index.js';

const { REFRESH_TOKEN_SECRET_KEY } = process.env;

const cookieBase = {
  httpOnly: true,
  path: '/',
  sameSite: 'none',
  secure: true,
  partitioned: true,
};

const refresh = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      throw RequestError(401, 'Missing refresh token');
    }

    let payload;

    try {
      payload = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);
    } catch {
      throw RequestError(401, 'Invalid or expired refresh token');
    }

    const session = await Session.findOne({
      userId: payload.id,
      refreshToken: token,
    });

    if (!session) {
      throw RequestError(401, 'Refresh token mismatch or session not found');
    }

    await Session.findByIdAndDelete(session._id);

    const { accessToken, refreshToken } = await createTokens(payload.id);

    res
      .cookie('accessToken', accessToken, {
        ...cookieBase,
        maxAge: 15 * 60 * 1000,
      })
      .cookie('refreshToken', refreshToken, {
        ...cookieBase,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: 'Token refreshed' });
  } catch (error) {
    console.error('Refresh error:', error.message);
    const status = error.status || 401;
    res.status(status).json({ message: error.message || 'Unauthorized' });
  }
};

export default refresh;

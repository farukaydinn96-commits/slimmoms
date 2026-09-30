import jwt from 'jsonwebtoken';
import { User, Session } from '../models/index.js';
import { RequestError } from '../helpers/index.js';

const { ACCESS_TOKEN_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    let token = req.cookies.accessToken;

    if (!token) {
      const authorization = req.headers.authorization;

      if (authorization?.startsWith('Bearer ')) {
        token = authorization.split(' ')[1];
      }
    }

    if (!token) {
      throw RequestError(401, 'Access token missing');
    }

    const { id } = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);

    const session = await Session.findOne({
      userId: id,
      accessToken: token,
    });

    if (!session) {
      throw RequestError(401, 'Session not found');
    }

    const user = await User.findById(id);

    if (!user) {
      throw RequestError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = 'Not authorized';
    }

    next(error);
  }
};

export default authenticate;

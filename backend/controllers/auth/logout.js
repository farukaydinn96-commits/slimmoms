import { Session } from '../../models/index.js';

const logout = async (req, res) => {
  const { _id } = req.user;

  await Session.deleteMany({ userId: _id });

  const sameSite = process.env.NODE_ENV === 'production' ? 'none' : 'strict';
  const secure = process.env.NODE_ENV === 'production';

  res
    .clearCookie('accessToken', {
      httpOnly: true,
      secure,
      sameSite,
      path: '/',
    })
    .clearCookie('refreshToken', {
      httpOnly: true,
      secure,
      sameSite,
      path: '/',
    })
    .status(200)
    .json({ message: 'Logout success' });
};

export default logout;

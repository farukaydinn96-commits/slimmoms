const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.JWT_SECRET || "slim_mom_super_gizli_anahtar";
const REFRESH_SECRET_KEY =
  process.env.JWT_REFRESH_SECRET || "slim_mom_super_gizli_refresh";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Bu e-posta adresi zaten kullanımda." });
    }

    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "E-posta veya şifre hatalı." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "E-posta veya şifre hatalı." });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token bulunamadı." });
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Geçersiz refresh token." });
    }

    jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Refresh token süresi dolmuş." });
      }

      const newToken = jwt.sign({ id: user._id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(200).json({ token: newToken });
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, { refreshToken: null });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Kullanıcı bulunamadı." });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  current,
};

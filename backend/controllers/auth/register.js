import bcrypt from "bcryptjs";
import { User } from "../../models/index.js";
import { RequestError, createTokens } from "../../helpers/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser.verify) {
    throw RequestError(409, "Email in use");
  }

  if (existingUser && !existingUser.verify) {
    return res.status(201).json({
      user: { name: existingUser.name, email: existingUser.email },
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const { accessToken, refreshToken } = await createTokens(newUser._id);

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      user: { name: newUser.name, email: newUser.email },
    });
};

export default register;

import bcrypt from "bcryptjs";
import { User } from "../../models/index.js";
import { RequestError, createTokens } from "../../helpers/index.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Current email is not registered");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }

  const { accessToken, refreshToken } = await createTokens(user._id);

  await User.findByIdAndUpdate(user._id, {
    accessToken,
    refreshToken,
  });


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
    .status(200)
    .json({
      user: {
        email: user.email,
        name: user.name,
      },
      dailyDiet: user.dailyDiet,
    });
};

export default login;

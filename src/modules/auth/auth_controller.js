import User from "../../../Db/models/user_model.js";
import Crypto from "crypto";
import { sendEmail } from "../../utils/sendEmail.js";
import {
  confirmationTemp,
  resetPasswordTemp,
} from "../../utils/template_html.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Token from "../../../Db/models/token_model.js";
import Randomstring from "randomstring";
import Cart from "../../../Db/models/cart_model.js";

export const register = async (req, res, next) => {
  const { userName, email, password, gender, phoneNum } = req.body;

  const isUser = await User.findOne({ email });
  if (isUser) {
    return next(new Error("This Email already Exists ", { cause: 409 }));
  }

  const hashPassword = bcrypt.hashSync(
    password,
    Number(process.env.SALT_ROUND)
  );

  const activationCode = Crypto.randomBytes(64).toString("hex");

  const user = await User.create({
    userName,
    email,
    password: hashPassword,
    gender,
    phoneNum,
    activationCode,
  });

  const link = `http://localhost:3000/auth/confirmation/${activationCode}`;

  const confirmEmail = await sendEmail({
    to: email,
    subject: "Confirmation Email",
    html: confirmationTemp(link),
  });

  if (!confirmEmail) {
    return next(new Error("Email does Not Exists", { cause: 400 }));
  }

  return res
    .status(201)
    .json({ success: true, message: "Please Check Your Email", user });
};

export const confirmation = async (req, res, next) => {
  const { activationCode } = req.params;

  const user = await User.findOneAndUpdate(
    { activationCode },
    {
      isConfirmed: true,
      $unset: { activationCode: 1 },
    },
    {
      new: true,
    }
  );

  
  if (!user) {
    return next(new Error("User does Not Exists", { cause: 400 }));
  }
  
  await Cart.create({ user: user._id });
  
  res.send("Your Email Confirmed Successfully Try To Login Now!");
};

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, isConfirmed: true });

  if (!user) {
    return next(new Error("Invalid Email", { cause: 400 }));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new Error("Incorrect Password", { cause: 400 }));
  }

  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.SECRET_KEY,
    { expiresIn: "2d" }
  );

  //add token to token list
  Token.create({ token, user: user._id, agent: req.headers["user-agent"] });
  //change status of user
  user.status = "Online";
  user.save();

  return res.json({ success: true, token });
};

export const forgetCode = async (req, res, next) => {
  const isUser = await User.findOne({ email: req.body.email });

  if (!isUser) {
    return next(new Error("Invalid Email", { cause: 400 }));
  }

  const code = Randomstring.generate({
    length: 5,
    charset: "numeric",
  });

  isUser.forgetCode = code;
  await isUser.save();

  const sendCode = await sendEmail({
    to: req.body.email,
    subject: "Reset Password",
    html: resetPasswordTemp(code),
  });

  if (!sendCode) {
    return next(new Error("Invalid Email", { cause: 400 }));
  }

  return res.json({ success: true, message: "Your Code Sent Successfully" });
};

export const resetPassword = async (req, res, next) => {
  const hashPassword = bcrypt.hashSync(
    req.body.password,
    Number(process.env.SALT_ROUND)
  );

  const user = await User.findOneAndUpdate(
    {
      forgetCode: req.body.forgetCode,
    },
    { $set: { password: hashPassword }, $unset: { forgetCode: 1 } }
  );

  if (!user) {
    return next(new Error("Invalid Code"));
  }

  return res.json({ success: true, message: "Password updated successfully" });
};

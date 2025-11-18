import { catchError } from "../utils/catchError.js";
import jwt from "jsonwebtoken";
import Token from "../../Db/models/token_model.js";
import User from "../../Db/models/user_model.js";

export const isAusthenticated = catchError(async (req, res, next) => {
  let token = req.headers["token"];
  //check if token
  if (!token || !token.startsWith(process.env.BEARER_TOKEN)) {
    return next(new Error("Token Is Required", { cause: 400 }));
  }

  token = token.split(process.env.BEARER_TOKEN)[1];

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (!decoded) {
    return next(new Error("invalid Token!"));
  }

  const dbToken = await Token.findOne({ token, isValid: true });
  if (!dbToken) {
    return next(new Error("invalid Token!"));
  }

  const user = await User.findOne({ email: decoded.email });

  req.user = user;

  return next();
});

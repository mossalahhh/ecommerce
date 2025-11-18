import { catchError } from "../utils/catchError.js";

export const isAuthorized = (role) => {
  return catchError(async (req, res, next) => {
    if (role !== req.user.role) {
      return next(new Error("You`re not authorized!!", { cause: 403 }));
    }
    return next();
  });
};

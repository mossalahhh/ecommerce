import { Router } from "express";
import { catchError } from "../../utils/catchError.js";
import {
  register,
  confirmation,
  logIn,
  forgetCode,
  resetPassword,
} from "./auth_controller.js";
import { isValid } from "../../middleware/validation_middleware.js";
import {
  confirmationSchema,
  forgetSchema,
  logInSchema,
  registerSchema,
  resetSchema,
} from "./register_validation.js";
const router = Router();

router.post("/register", isValid(registerSchema), catchError(register));

router.get(
  "/confirmation/:activationCode",
  isValid(confirmationSchema),
  catchError(confirmation)
);

router.post("/logIn", isValid(logInSchema), catchError(logIn));

router.patch("/forgetCode", isValid(forgetSchema), catchError(forgetCode));

router.patch("/resetPassword", isValid(resetSchema), catchError(resetPassword));

export default router;

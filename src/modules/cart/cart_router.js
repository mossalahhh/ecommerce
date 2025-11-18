import { Router } from "express";
import { isAusthenticated } from "../../middleware/authentication.js";
import { catchError } from "../../utils/catchError.js";
import { isValid } from "../../middleware/validation_middleware.js";
import {
  CartSchema,
  updateCartSchema,
  rmProductCartSchema,
} from "./cart_validation.js";
import {
  addToCart,
  userCart,
  updateCart,
  rmProductFromCart,
  clearCart,
} from "./cart_controller.js";
const router = Router();

router.post("/", isAusthenticated, isValid(CartSchema), catchError(addToCart));

router.get("/", isAusthenticated, catchError(userCart));

router.patch(
  "/",
  isAusthenticated,
  isValid(updateCartSchema),
  catchError(updateCart)
);

router.patch("/clear", isAusthenticated, catchError(clearCart));

router.patch(
  "/:productId",
  isAusthenticated,
  isValid(rmProductCartSchema),
  catchError(rmProductFromCart)
);

export default router;

import { Router } from "express";
import { isAusthenticated } from "../../middleware/authentication.js";
import { isValid } from "../../middleware/validation_middleware.js";
import { catchError } from "../../utils/catchError.js";
import { createOrderSchema, cancelOrderSchema } from "./order_vlidation.js";
import { createOrder, cancelOrder } from "./order_controller.js";
const router = Router();

router.post(
  "/",
  isAusthenticated,
  isValid(createOrderSchema),
  catchError(createOrder)
);

router.patch(
  "/:invoiceId",
  isAusthenticated,
  isValid(cancelOrderSchema),
  catchError(cancelOrder)
);

export default router;

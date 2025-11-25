import { Router } from "express";
import { isAusthenticated } from "../../middleware/authentication.js";
import { isValid } from "../../middleware/validation_middleware.js";
import { catchError } from "../../utils/catchError.js";
import { createOrderSchema, cancelOrderSchema } from "./order_vlidation.js";
import { createOrder, cancelOrder, orderWebhook } from "./order_controller.js";
import express from "express";
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

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  catchError(orderWebhook)
);
export default router;

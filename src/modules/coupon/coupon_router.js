import { Router } from "express";
import { isAusthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { isValid } from "../../middleware/validation_middleware.js";
import { catchError } from "../../utils/catchError.js";
import {
  createCouponSchema,
  updateCouponSchema,
  deleteCouponSchema,
} from "./coupon_validation.js";
import {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  allCoupons,
} from "./coupon_controller.js";

const router = Router();

router.post(
  "/",
  isAusthenticated,
  isAuthorized("admin"),
  isValid(createCouponSchema),
  catchError(createCoupon)
);

router.patch(
  "/:code",
  isAusthenticated,
  isAuthorized("admin"),
  isValid(updateCouponSchema),
  catchError(updateCoupon)
);

router.delete(
  "/:code",
  isAusthenticated,
  isAuthorized("admin"),
  isValid(deleteCouponSchema),
  catchError(deleteCoupon)
);

router.get("/", catchError(allCoupons));

export default router;

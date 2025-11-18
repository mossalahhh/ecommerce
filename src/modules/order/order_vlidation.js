import Joi from "joi";
import { isValidObject } from "../../middleware/validation_middleware.js";

export const createOrderSchema = Joi.object({
  address: Joi.string().min(10).required(),
  coupon: Joi.string().length(5),
  phone: Joi.string()
    .pattern(/^(\+201|01|00201)[0125][0-9]{8}$/)
    .required(),
  payment: Joi.string().valid("Visa", "Cash").required(),
}).required();

export const cancelOrderSchema = Joi.object({
  invoiceId: Joi.string().custom(isValidObject).required(),
}).required();

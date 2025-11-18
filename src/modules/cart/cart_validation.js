import Joi from "joi";
import { isValidObject } from "../../middleware/validation_middleware.js";

export const CartSchema = Joi.object({
  productId: Joi.string().custom(isValidObject).required(),
  quantity: Joi.number().integer().min(1),
}).required();

export const updateCartSchema = Joi.object({
  productId: Joi.string().custom(isValidObject).required(),
  quantity: Joi.number().integer().min(1).required(),
}).required();

export const rmProductCartSchema = Joi.object({
  productId: Joi.string().custom(isValidObject).required(),
}).required();

import Joi from "joi";
import { isValidObject } from "../../middleware/validation_middleware.js";

export const createBrandSchema = Joi.object({
  name: Joi.string().required(),
  createdBy: Joi.string().custom(isValidObject),
  categoryId: Joi.string().custom(isValidObject),
}).required();

export const updateBrandSchema = Joi.object({
  name: Joi.string(),
  brandId: Joi.string().custom(isValidObject),
}).required();

export const deleteBrandSchema = Joi.object({
  brandId: Joi.string().custom(isValidObject),
}).required();

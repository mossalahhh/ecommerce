import Joi from "joi";

import { isValidObject } from "../../middleware/validation_middleware.js";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string(),
  description : Joi.string().required(),
  availableItems: Joi.number().min(1).required(),
  soldItems: Joi.number().default(0),
  price: Joi.number().required(),
  discount: Joi.number().min(1).max(100).default(0).optional(),
  createdBy: Joi.string().custom(isValidObject),
  categoryId: Joi.string().custom(isValidObject),
  subCategoryId: Joi.string().custom(isValidObject),
  brandId: Joi.string().custom(isValidObject),
  cloudFolder: Joi.string(),
}).required();

export const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  slug: Joi.string().optional(),
  description:Joi.string().optional(),
  price: Joi.number().optional(),
  discount: Joi.number().min(1).max(100).optional(),
  productId: Joi.string().custom(isValidObject),
}).required();

export const productIdSchema = Joi.object({
  productId: Joi.string().custom(isValidObject).required(),
});

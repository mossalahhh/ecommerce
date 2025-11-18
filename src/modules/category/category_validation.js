import Joi from "joi";
import { isValidObject } from "../../middleware/validation_middleware.js";

export const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  createdBy: Joi.string().custom(isValidObject),
}).required();

export const updateCategorySchema = Joi.object({
  name: Joi.string(),
  categoryId: Joi.string().custom(isValidObject),
}).required();

export const deleteCategorySchema = Joi.object({
  categoryId: Joi.string().custom(isValidObject),
}).required();

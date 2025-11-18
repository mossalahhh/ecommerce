import Joi from "joi";
import { isValidObject } from "../../middleware/validation_middleware.js";

export const creatSubCategorySchema = Joi.object({
  name: Joi.string().required(),
  brandId: Joi.array().items(Joi.string().required()),
  createdBy: Joi.string().custom(isValidObject),
  categoryId: Joi.string().custom(isValidObject),
}).required();

export const updateSubCategorySchema = Joi.object({
  name: Joi.string(),
  categoryId: Joi.string().custom(isValidObject),
  subCategoryId: Joi.string().custom(isValidObject),
}).required();

export const daleteSubCategorySchema = Joi.object({
  categoryId: Joi.string().custom(isValidObject),
  subCategoryId: Joi.string().custom(isValidObject),
}).required();

export const getAllSubCategorySchema = Joi.object({
  categoryId: Joi.string().custom(isValidObject),
  subCategoryId: Joi.string().custom(isValidObject),
}).required();

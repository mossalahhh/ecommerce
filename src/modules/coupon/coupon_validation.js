import Joi from "joi";

export const createCouponSchema = Joi.object({
  discount: Joi.number().min(1).max(100).required(),
  expiredAt: Joi.date().greater(Date.now()).required(),
}).required();

export const updateCouponSchema = Joi.object({
  code: Joi.string(),
  discount: Joi.number().min(1).max(100).optional(),
  expiredAt: Joi.date().greater(Date.now()).optional(),
}).required();

export const deleteCouponSchema = Joi.object({
  code: Joi.string(),
});

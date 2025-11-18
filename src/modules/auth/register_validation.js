import Joi from "joi";

export const registerSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(15),
  email: Joi.string().email(),
  password: Joi.string(),
  confirmPassword: Joi.string().valid(Joi.ref("password")),
  phoneNum: Joi.string(),
  gender: Joi.string().valid("Male", "Female"),
}).options({ presence: "required" });

export const confirmationSchema = Joi.object({
  activationCode: Joi.string(),
}).options({ presence: "required" });

export const logInSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string(),
}).options({ presence: "required" });

export const forgetSchema = Joi.object({
  email: Joi.string().email(),
}).options({ presence: "required" });

export const resetSchema = Joi.object({
  forgetCode: Joi.string(),
  password: Joi.string(),
  confirmPassword: Joi.string().valid(Joi.ref("password")),
}).options({ presence: "required" });

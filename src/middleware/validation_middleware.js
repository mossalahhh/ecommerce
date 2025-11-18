import { Types } from "mongoose";


export const isValidObject = (value, helper) => {
  if (Types.ObjectId.isValid(value)) {
    return true;
  } else {
    return helper.message("Invalid Obj-id");
  }
};


export const isValid = (schema) => {
  return (req, res, next) => {
    const copyReq = { ...req.body, ...req.params, ...req.query };

    const validationSchema = schema.validate(copyReq, { abortEearly: false });

    if (validationSchema.error) {
      const arrayError = validationSchema.error.details.map(
        (error) => error.message
      );
      return next(new Error(arrayError, { cause: 400 }));
    }
    return next();
  };
};

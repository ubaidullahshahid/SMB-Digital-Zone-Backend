import Joi from "joi";

export const registerValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "email is required",
      "string.email": "email must be a valid email",
      "any.required": "email is required",
    }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "password is required",
    "string.min": "password must be at least 8 characters",
    "any.required": "password is required",
  }),
});

export const loginValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "email is required",
      "string.email": "email must be a valid email",
      "any.required": "email is required",
    }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "password is required",
    "string.min": "password must be at least 8 characters",
    "any.required": "password is required",
  }),
});

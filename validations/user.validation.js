const Joi = require("joi");

const validateUser = data => {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().min(10).required(),
    role: Joi.string().valid("admin", "user").required(),
  });

  return userSchema.validate(data);
};

module.exports = { validateUser };

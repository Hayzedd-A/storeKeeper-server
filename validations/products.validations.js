const Joi = require("joi");

const validatePurchases = data => {
  const purchaseSchema = Joi.object({
    id: Joi.string().required(),
    purchaseValue: Joi.number().required(),
    amount: Joi.number().required(),
    name: Joi.string().required(),
  });

  return purchaseSchema.validate(data);
};

const validateProductUpdate = data => {
  const productUpdateSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string(),
    price: Joi.number(),
    quantity: Joi.number(),
  });

  return productUpdateSchema.validate(data);
};

module.exports = { validatePurchases, validateProductUpdate };

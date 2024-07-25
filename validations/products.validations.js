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

module.exports = { validatePurchases };

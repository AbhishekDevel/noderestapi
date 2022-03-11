const Joi = require("joi");

const registrationvalidate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    mobile: Joi.string().min(10).required(),
    refco: Joi.string().min(6).max(12),
  });
  return schema.validate(data);
};

module.exports.registrationvalidate = registrationvalidate
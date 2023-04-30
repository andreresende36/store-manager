const Joi = require('joi');

const productNameSchema = Joi.string().min(5);

module.exports = {
  productNameSchema,
};
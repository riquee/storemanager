//AJUDA DO PAULO SIMÕES
const joi = require('@hapi/joi');

const MIN_QUANTITY = 1;
const WRONG_MESSAGE = 'Wrong product ID or invalid quantity';

module.exports = joi
  .object({
    productId: joi.string().required(),
    quantity: joi.number().min(MIN_QUANTITY).required(),
  })
  .messages({
    'any.required': WRONG_MESSAGE,
    'number.min': WRONG_MESSAGE,
    'number.base': WRONG_MESSAGE,
  });

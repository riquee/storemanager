//AJUDA DO PAULO SIMÕES
const joi = require('@hapi/joi');

const MIN_NAME_LENGTH = 5;
const MIN_QUANTITY = 1;

module.exports = joi
  .object({
    name: joi.string().min(MIN_NAME_LENGTH).required(),
    quantity: joi.number().min(MIN_QUANTITY).strict().required(),
  })
  .messages({
    'any.required': 'O campo {#label} é obrigatório',
  });

const sales = require('../schema/sales');

module.exports = (req, res, next) => {
  const { body } = req;
  body.forEach((sale) => {
    const { error } = sales.validate(sale);
    if (error) next(error);
  });
  next();
};

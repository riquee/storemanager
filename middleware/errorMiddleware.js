const { INTERNAL_ERROR, INVALID_DATE, NOT_FOUND } = require('../utils/statusCode');

module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.isJoi) {
    return res.status(INVALID_DATE).json({
      err: {
        code: 'invalid_data',
        message: err.details[0].message,
      },
    });
  }

  if (err.err.code === 'not_found') return res.status(NOT_FOUND).json(err);
  if (err.err.code === 'stock_problem') return res.status(NOT_FOUND).json(err);

  if (err.err.code && err.err.message) return res.status(INVALID_DATE).json(err);
  
  res.status(INTERNAL_ERROR).json({
    err: {
      code: INTERNAL_ERROR,
      message: 'INTERNAL ERROR',
    },
  });
};

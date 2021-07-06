const Sales = require('../models/Sales');
const Product = require('../models/Products');

const findById = async (id) => {
  const product = await Sales.findById(id);
  if (!product)
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  return product;
};

const create = async (sales) => {
  const resolve = await Promise.all(sales.map((s) => Product.checkQuantity(s)));
  const validateSales = resolve.every(((sale) => sale));
  if (!validateSales) { 
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    };
  }
  sales.forEach((sale) => { Product.updateQuantity(sale); });
  return Sales.create(sales);
};

const excluse = async (id) => {
  const { itensSold } = await Sales.findById(id);
  const product = await Sales.excluse(id);
  if (!product)
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  itensSold.forEach((sale) => Product.updateDelete(sale));
  return product;
};

module.exports = {
  findById,
  create,
  getAll: Sales.getAll,
  update: Sales.update,
  excluse,
};

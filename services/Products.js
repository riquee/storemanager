const Products = require('../models/Products');

const create = async (name, quantity) => {
  const checkProduct = await Products.findByName(name);
  if (checkProduct) return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  };
  return Products.create(name, quantity);
};

const findById = async (id) => {
  const product = await Products.findById(id);
  if (!product) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };
  return product;
};

const excluse = async (id) => {
  const product = await Products.excluse(id);
  if (!product) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };
  return product;
};

const update = async (id, updates) => Products.update(id, updates);

module.exports = {
  create,
  findById,
  update,
  excluse,
  getAll: Products.getAll
};

const express = require('express');
const rescue = require('express-rescue');
const { productValidate } = require('../middleware');
const Products = require('../services/Products');
const { SUCCESS ,CREATED } = require('../utils/statusCode');
const products = express.Router();

products.get('/', rescue( async (req, res, next) => {
  const products = await Products.getAll();
  res.status(SUCCESS).json({ products });
}));

products.get('/:id', rescue( async (req, res, next) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  if (product.err) return next(product);
  return res.status(SUCCESS).json(product);
}));


products.post('/', productValidate, rescue( async (req, res, next) => {
  const { name, quantity} = req.body;
  const product = await Products.create(name, quantity);
  if(product.err) return next(product);
  return res.status(CREATED).json(product);
}));

products.put('/:id', productValidate, rescue( async (req, res) => {
  const { id } = req.params;
  const product = await Products.update(id, req.body);
  return res.status(SUCCESS).json(product);
}));

products.delete('/:id', rescue( async (req, res, next) => {
  const { id } = req.params;
  const product = await Products.excluse(id);
  if (product.err) return next(product);
  return res.status(SUCCESS).json(product);
}));


module.exports = products;

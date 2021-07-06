const express = require('express');
const rescue = require('express-rescue');
const { salestValidate } = require('../middleware');
const Sales = require('../services/Sales');
const { SUCCESS, CREATED } = require('../utils/statusCode');
const sales = express.Router();
const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

sales.get('/', rescue( async (req, res) => {
  const sales = await Sales.getAll();
  res.status(SUCCESS).json({ sales });
}));

sales.get('/:id', rescue( async (req, res, next) => {
  const { id } = req.params;
  const sales = await Sales.findById(id);
  if (sales.err) return next(sales);
  return res.status(SUCCESS).json(sales);
}));

sales.post('/', salestValidate, rescue( async (req, res, next) => {
  const sales = await Sales.create(req.body);
  console.log('eeer', sales.err);
  if (sales.err) return next(sales);
  return res.status(SUCCESS).json(sales);
}));

sales.put('/:id', salestValidate, rescue( async (req, res) => {
  const { id } = req.params;
  const sales = await Sales.update(id, req.body);
  return res.status(SUCCESS).json(sales);
}));

sales.delete('/:id', rescue( async (req, res, next) => {
  const { id } = req.params;
  const sales = await Sales.excluse(id);
  if (sales.err) return next(sales);
  return res.status(SUCCESS).json(sales);
}));


// sales.put('/test', async (req, res) => {
//   const id = '60d729abf1c433738ac2ae59';
//   const { quantUpdate } = req.body;
//   console.log(quantUpdate);
//   const db = await connection();
//   const { modifiedCount } = await db.collection('products').updateOne(
//     {
//       _id: ObjectId(id),
//       quantity: { $gte: quantUpdate },
//     },
//     { $inc: { quantity: quantUpdate - (quantUpdate * 2) } },
//     // { $set: { quantity: quantUpdate }  },
//   );
//   res.status(200).json({ modifiedCount });

// });

module.exports = sales;

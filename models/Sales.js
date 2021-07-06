const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  return db.collection('sales').findOne(ObjectId(id));
};

const create = async (sales) => {
  const db = await connection();
  const { insertedId } = await db.collection('sales').insertOne({ itensSold: sales});
  return {
    _id: insertedId,
    itensSold: sales
  };
};

const update = async (id, updates) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: updates } });
  return findById(id);
};

const excluse = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const sales = await findById(id);
  db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sales;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  excluse,
};

const productsServices = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsServices.getAll();
  return res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.findById(id);
  const { type = undefined, message = undefined } = product;
  if (type) return res.status(404).json({ message });
  return res.status(200).json(product);
};

const create = async (req, res) => {
  const product = req.body;
  const result = await productsServices.create(product);
  return res.status(201).json(result);
};

const update = async (req, res) => {
  const productId = Number(req.params.id);
  const { name } = req.body;

  const result = await productsServices.update({ productId, name });
  const { type = undefined, message = undefined } = result;
  if (type) return res.status(type).json({ message });
  return res.status(200).json({ id: productId, name });
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};
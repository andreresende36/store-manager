const productsServices = require('../services/productsServices');

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

module.exports = {
  getAll,
  findById,
};
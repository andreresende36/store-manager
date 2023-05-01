const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product || product.length === 0) return { type: 404, message: 'Product not found' };
  return product;
};

const create = async (product) => {
  const result = await productsModel.create(product);
  return result;
};

const update = async ({ productId, name }) => {
  const result = await productsModel.update({ productId, name });
  if (result.affectedRows === 0) return { type: 404, message: 'Product not found' };
  return true;
};

const exclude = async (productId) => {
  const result = await productsModel.exclude(productId);
  if (result.affectedRows === 0) return { type: 404, message: 'Product not found' };
  return true;
};

const search = async (query) => {
  const result = await productsModel.search(query);
  return result;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
  search,
};
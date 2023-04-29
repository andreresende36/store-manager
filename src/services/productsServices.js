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

module.exports = {
  getAll,
  findById,
};
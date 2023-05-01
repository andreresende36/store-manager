const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const findById = async (saleId) => {
  const sales = await salesModel.getAll();
  const existsSale = sales.some((sale) => sale.saleId === saleId);
  if (!existsSale) return { type: 404, message: 'Sale not found' };
  
  const sale = await salesModel.findById(saleId);
  return sale;
};

const create = async (sales) => {
  const products = await productsModel.getAll();
  const productIds = products.map((product) => product.id);
  const validIds = sales.every((product) => productIds.includes(product.productId));

  if (!validIds) return { type: 404, message: 'Product not found' };

  const createdSales = await salesModel.create(sales);
  return createdSales;
};

module.exports = {
  getAll,
  create,
  findById,
};
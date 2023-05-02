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

const create = async (sale) => {
  const products = await productsModel.getAll();
  const productIds = products.map((product) => product.id);
  const validIds = sale.every((product) => productIds.includes(product.productId));

  if (!validIds) return { type: 404, message: 'Product not found' };

  const createdSales = await salesModel.create(sale);
  return createdSales;
};

const update = async ({ saleId, sale }) => {
  const sales = await getAll();
  const existsSaleId = sales.some((item) => item.saleId === saleId);
  if (!existsSaleId) return { type: 404, message: 'Sale not found' }; 

  const result = await Promise.all(await salesModel.update({ saleId, sale })).then((res) => res);
  if (result.every((res) => res.affectedRows === 1)) return true;
 
  return { type: 404, message: 'Product not found' };
};

const exclude = async (saleId) => {
  const result = await salesModel.exclude(saleId);

  if (result.affectedRows === 0) return { type: 404, message: 'Sale not found' };
  return true;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  exclude,
};
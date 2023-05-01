const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(200).json(sales);
};

const findById = async (req, res) => {
  const saleId = Number(req.params.id);
  const sale = await salesService.findById(saleId);
  const { type, message } = sale;
  if (type) return res.status(type).json({ message });
  return res.status(200).json(sale);
};

const create = async (req, res) => {
  const sales = req.body;
  const createdSales = await salesService.create(sales);
  const { type = undefined, message = undefined } = createdSales;
  if (type) return res.status(type).json({ message });
  return res.status(201).json(createdSales);
};

module.exports = {
  getAll,
  create,
  findById,
};
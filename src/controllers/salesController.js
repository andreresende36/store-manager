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

const exclude = async (req, res) => {
  const saleId = Number(req.params.id);
  const result = await salesService.exclude(saleId);
  const { type = undefined, message = undefined } = result;
  if (type) return res.status(type).json({ message });
  return res.status(204).json();
};

module.exports = {
  getAll,
  create,
  findById,
  exclude,
};
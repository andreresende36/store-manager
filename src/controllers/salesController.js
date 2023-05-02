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
  const sale = req.body;
  const createdSale = await salesService.create(sale);
  const { type = undefined, message = undefined } = createdSale;
  if (type) return res.status(type).json({ message });
  return res.status(201).json(createdSale);
};

const update = async (req, res) => {
  const saleId = Number(req.params.id);
  const newData = req.body;
  const result = await salesService.update({ saleId, sale: newData });
  const { type = undefined, message = undefined } = result;
  if (type) return res.status(type).json({ message });
  if (result) return res.status(200).json({ saleId, itemsUpdated: newData });
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
  update,
  exclude,
};
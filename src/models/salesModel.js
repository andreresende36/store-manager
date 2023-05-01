const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const dbQuery = `SELECT SP.sale_id, S.date, SP.product_id, SP.quantity
  FROM StoreManager.sales_products as SP
  INNER JOIN StoreManager.sales as S
  ON SP.sale_id = S.id;`;
  const [sales] = await connection.execute(dbQuery);
  return camelize(sales);
};

const findById = async (saleId) => {
  const dbQuery = `SELECT S.date, SP.product_id, SP.quantity
  FROM StoreManager.sales_products as SP
  INNER JOIN StoreManager.sales as S
  ON SP.sale_id = S.id
  WHERE S.id = ?;`;
  const [sale] = await connection.execute(dbQuery, [saleId]);
  return camelize(sale);
};

const create = async (sales) => {
  // const placeholders = sales.map((_e, i) => (i !== sales.length - 1 ? '(?), ' : '(?);')).join('');
  const currentDateTime = new Date();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?);',
    [currentDateTime],
  );
  sales.forEach(async (product) => {
    const { productId, quantity } = product;
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (product_id, sale_id, quantity) VALUES (?, ?, ?);',
      [productId, insertId, quantity], 
    );
  });
  return { id: insertId, itemsSold: sales };
};
  
module.exports = {
  getAll,
  create,
  findById,
};
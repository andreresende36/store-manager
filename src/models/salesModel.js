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

const create = async (sale) => {
  // const placeholders = sales.map((_e, i) => (i !== sales.length - 1 ? '(?), ' : '(?);')).join('');
  const currentDateTime = new Date();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?);',
    [currentDateTime],
  );
  sale.forEach(async (product) => {
    const { productId, quantity } = product;
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (product_id, sale_id, quantity) VALUES (?, ?, ?);',
      [productId, insertId, quantity], 
    );
  });
  return { id: insertId, itemsSold: sale };
};

const update = async ({ saleId, sale }) => {
  const result = await sale.map(async (product) => {
    const [partialResult] = await connection.execute(
      'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;',
      [product.quantity, saleId, product.productId],
    );
    return partialResult;
  });
  return Promise.all(await result).then((data) => data);
};

const exclude = async (saleId) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
  return result;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  exclude,
};
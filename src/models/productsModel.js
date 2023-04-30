const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?;',
    [productId]);
  return product;
};

const create = async (product) => {
  const { name } = product;
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );
  return { id: insertId, name };
};

module.exports = {
  getAll,
  findById,
  create,
};
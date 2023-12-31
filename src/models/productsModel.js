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

const update = async ({ productId, name }) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, productId],
  );
  return result;
};

const exclude = async (productId) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const search = async (query) => {
  const transformedQuery = `%${query}%`;
  const [result] = await connection.execute(
    'SELECT id, name FROM StoreManager.products WHERE name LIKE ?;',
    [transformedQuery],
  );
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
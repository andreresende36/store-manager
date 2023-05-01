const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute('SELECT * FROM StoreManager.sales');
  return sales;
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
};
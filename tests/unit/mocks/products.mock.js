const products = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const newProduct = { "name": 'Anel do Lanterna Verde' }

const updateResult = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1
};

const updateResultProductNotFound = {
  fieldCount: 0,
  affectedRows: 0,
  insertId: 0,
  info: 'Rows matched: 0  Changed: 0  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0
};

const excludeResult = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const excludeResultProductNotFound = {
  fieldCount: 0,
  affectedRows: 0,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

module.exports = {
  products,
  newProduct,
  updateResult,
  excludeResult,
  updateResultProductNotFound,
  excludeResultProductNotFound
};
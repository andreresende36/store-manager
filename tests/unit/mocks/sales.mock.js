const salesCamelCase = [
  {
    "saleId": 1,
    "date": "2023-05-02T18:54:53.000Z",
    "productId": 1,
    "quantity": 1
  },
  {
    "saleId": 1,
    "date": "2023-05-02T18:54:53.000Z",
    "productId": 2,
    "quantity": 5
  },
  {
    "saleId": 2,
    "date": "2023-05-02T18:54:53.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const salesSnakeCase = [
  {
    "sale_id": 1,
    "date": "2023-05-02T18:54:53.000Z",
    "product_id": 1,
    "quantity": 1
  },
  {
    "sale_id": 1,
    "date": "2023-05-02T18:54:53.000Z",
    "product_id": 2,
    "quantity": 5
  },
  {
    "sale_id": 2,
    "date": "2023-05-02T18:54:53.000Z",
    "product_id": 3,
    "quantity": 15
  }
]

const saleFindByIdResultSnakeCase = [
  {
    "date": "2023-05-03T14:07:14.000Z",
    "product_id": 1,
    "quantity": 5
  },
  {
    "date": "2023-05-03T14:07:14.000Z",
    "product_id": 2,
    "quantity": 10
  }
];

const saleFindByIdResultCamelCase = [
  {
    "date": "2023-05-03T14:07:14.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-05-03T14:07:14.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const newSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const newSaleProductIdNotFound = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 10,
    "quantity": 5
  }
];

const updatedSale = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
];

const updatedSaleProductIdNotFound = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 10,
    "quantity": 50
  }
];

const partialResult = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1
};

const partialResultProductIdFound = {
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
  salesCamelCase,
  salesSnakeCase,
  saleFindByIdResultSnakeCase,
  saleFindByIdResultCamelCase,
  newSale,
  newSaleProductIdNotFound,
  updatedSale,
  updatedSaleProductIdNotFound,
  partialResult,
  partialResultProductIdFound,
  excludeResult,
  excludeResultProductNotFound
};
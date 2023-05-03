const sales = [
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

const newSaleWithoutProductId = [
  {
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const newSaleWithoutQuantity = [
  {
    "productId": 1
  },
  {
    "productId": 2,
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

module.exports = {
  sales,
  newSale,
  newSaleWithoutProductId,
  newSaleWithoutQuantity,
  updatedSale,
};
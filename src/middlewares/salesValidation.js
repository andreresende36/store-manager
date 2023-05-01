const productIdValidation = async (req, res, next) => {
  const sales = req.body;
  const existsProductId = sales.every((product) => (!!product.productId));
  if (!existsProductId) return res.status(400).json({ message: '"productId" is required' });
  return next();
};

const quantityValidation = async (req, res, next) => {
  const sales = req.body;
  const existsQuantity = sales.every((product) => product.quantity !== undefined);
  const quantityMoreThanZero = sales.every((product) => Number(product.quantity) >= 1);
  if (!existsQuantity) return res.status(400).json({ message: '"quantity" is required' });
  if (!quantityMoreThanZero) {
    return res.status(422).json(
      { message: '"quantity" must be greater than or equal to 1' },
    );
  }
  return next();
};

module.exports = {
  productIdValidation,
  quantityValidation,
};
const express = require('express');
const salesController = require('../controllers/salesController');
const salesValidation = require('../middlewares/salesValidation');

const router = express.Router();

router.get('/:id', salesController.findById);

router.get('/', salesController.getAll);

router.post('/',
  salesValidation.productIdValidation,
  salesValidation.quantityValidation,
  salesController.create);

router.put('/:id',
  salesValidation.productIdValidation,
  salesValidation.quantityValidation,
  salesController.update);

router.delete('/:id', salesController.exclude);

module.exports = router;
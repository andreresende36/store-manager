const express = require('express');
const productsController = require('../controllers/productsController');
const productsValidation = require('../middlewares/productsValidation');

const router = express.Router();

router.get('/:id', productsController.findById);

router.get('/', productsController.getAll);

router.post('/', productsValidation.nameValidation, productsController.create);

router.put('/:id', productsValidation.nameValidation, productsController.update);

module.exports = router;
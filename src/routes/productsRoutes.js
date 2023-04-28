const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/:id', productsController.findById);

router.get('/', productsController.getAll);

module.exports = router;
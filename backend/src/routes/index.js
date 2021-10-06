const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products')

router.get('/products', productsController.index);
router.delete('/products/:id', productsController.removeProduct);

module.exports = router
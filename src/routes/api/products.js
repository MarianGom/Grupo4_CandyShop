const express = require('express');
const router = express.Router();
const productosAPIController = require('../../controllers/api/productosAPIController');

router.get('/products/', productosAPIController.allProducts);
router.get('/products/:id', productosAPIController.details);

module.exports = router;
const express = require('express');
const router = express.Router();
const productosAPIController = require('../../controllers/api/productosAPIController');

router.get('/productos', productosAPIController.allProducts);
router.get('/productos/:id', productosAPIController.details);

module.exports = router;
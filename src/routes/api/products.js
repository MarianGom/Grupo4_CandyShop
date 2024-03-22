const express = require('express');
const router = express.Router();
const productosAPIController = require('../../controllers/api/productosAPIController');

router.get('/productos/:pag?', productosAPIController.allProducts);
router.get('/productos/detail/:id', productosAPIController.details);

module.exports = router;
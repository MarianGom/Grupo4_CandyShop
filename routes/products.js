var express = require('express');
const productosController = require('../controllers/productosController');
var router = express.Router();

/* GET productos page. */
router.get('/', productosController.index)

module.exports = router;

var express = require('express');
const productsController = require('../controllers/productosController');
var router = express.Router();

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/crearProductos/', productsController.create); 
router.put('/', productsController.store); 


/*** EDIT ONE PRODUCT ***/ 
router.get('/editarProductos/', productsController.edit); 
//router.???('/:id', productsController.update); 


module.exports = router;

var express = require('express');
const mainController = require('../controllers/mainController');
var router = express.Router();

/* GET home page. */
router.get('/', mainController.index);

/* GET nosotros page. */
router.get('/nosotros', mainController.info)


module.exports = router;














/*const express = require('express');
const router = express.Router();
const path = require('path');

const carritoController = require('../controllers/carritoController');
const productosController = require('../controllers/productosController');
const usersController = require('../controllers/usersController');

router.get('/', productosController.index);
router.get('/producto', productosController.show);
router.get('/edit', productosController.show); /* Hasta  

router.get('/login', usersController.login);
router.get('/registro', usersController.add);

router.get('/carrito', carritoController.index);*/
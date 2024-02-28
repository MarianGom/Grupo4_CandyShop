var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');


router.get('/', mainController.index);
router.get('/nosotros', mainController.info)
/* router.get('/productos', mainController.productos) */
router.get('/carrito', mainController.carrito)

router.get('/error', mainController.error)


module.exports = router;

var express = require('express');
const productsController = require('../controllers/productosController');
var router = express.Router();

const { body } = require('express-validator');

// *** Configurar multer ***
const path = require('path')
const multer = require('multer')

function createImageName(file) {
    return 'img-'+ Date.now() + '-' + file.originalname
}

const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("entro en destination", file)
        const destinationFolder = path.join(
            __dirname,
            '../public/img/productos'
        )
        cb(null, destinationFolder)
    },
    filename: (req, file, cb) => {
        const newFileName = createImageName(file)  
        cb(null, newFileName)
    }
})

const uploadFile = multer({ storage: storage });

const validateAddProduct = require('../middlewares/addProductValidate')

/* Validaciones - ExpressValidator */
let validateEditProduct = [
    body('nombre')
        .notEmpty().withMessage('Completar el campo nombre').bail()
        .isLength({ min: 4})
        .isString(),
    body('sabor')
        .notEmpty().withMessage('Completar el campo sabor').bail()
        .isLength({min : 4})
        .isString(),
    body('descripcion')
        .notEmpty().withMessage('Completar el campo descripcion').bail()
        .isLength({min : 4})
        .isString(),
    body('stock')
        .notEmpty().withMessage('Completar el campo stock').bail()
        .isInt(),
    body('precio')
        .notEmpty().withMessage('Completar el campo precio').bail()
        .isFloat(),
    body('categoriaProd')
        .notEmpty().withMessage('Seleccionar una categoria').bail()
];

/* RUTAS */ 

router.get('/list/:pag/:cat?', productsController.index);
router.get('/detail/:id', productsController.detail); 

/* Para admin */
router.get('/all/:pag', productsController.list);
 
router.get('/create/', productsController.create); 
router.post('/list/0', uploadFile.single('image'), validateAddProduct, productsController.store); 

router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', uploadFile.single('image'), validateEditProduct, productsController.update);

router.get('/delete/:id', productsController.delete); 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;

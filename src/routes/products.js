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
            '../../public/img/productos'
        )
        cb(null, destinationFolder)
    },
    filename: (req, file, cb) => {
        console.log('entro a filename')
        const newFileName = createImageName(file)  
        cb(null, newFileName)
    }
})

const uploadFile = multer({ storage: storage });


/* Validaciones - ExpressValidator */
const addProductValidate = require ('../middlewares/addProductValidate')
const editProductValidate = require ('../middlewares/addProductValidate')


/* RUTAS */ 

router.get('/list/:pag/:cat?', productsController.index);
router.get('/detail/:id', productsController.detail); 

/* Para admin */
router.get('/all/:pag', productsController.list);
 
router.get('/create/', productsController.create); 
router.post('/all/:pag', uploadFile.single('image'), addProductValidate, productsController.store); 

router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', uploadFile.single('image'), editProductValidate, productsController.update);

router.get('/delete/:id', productsController.delete); 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;

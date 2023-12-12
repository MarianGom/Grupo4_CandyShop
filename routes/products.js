var express = require('express');
var router = express.Router();

// *** Configurar multer ***
const path = require('path')
const multer = require('multer')

//lugar donde se guardaran los archivos en el servidor
const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("entro en destinnaition", file)
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

function createImageName(file) {
    return 'img-'+ Date.now() + '-' + file.originalname
}

const uploadFile = multer({
    storage
})

// *** Configurar multer ***

const productsController = require('../controllers/productosController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', uploadFile.single('image'), productsController.store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id/', productsController.edit); 
router.put('/:id', productsController.update);

/*** DELETE ONE PRODUCT ***/ 
router.get('/:id/', productsController.delete); 

module.exports = router;

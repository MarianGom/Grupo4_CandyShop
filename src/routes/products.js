var express = require('express');
const productsController = require('../controllers/productosController');
var router = express.Router();


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


/* RUTAS */ 

router.get('/', productsController.index); 

router.get('/detail/:id', productsController.detail); 
 
router.get('/create/', productsController.create); 
router.post('/', uploadFile.single('image'), productsController.store); 

router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', uploadFile.single('image'), productsController.update);

router.get('/delete/:id', productsController.delete); 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;

const express = require('express');
const usersController = require('../controllers/usersController');
const path = require('path');
const router = express.Router();

/* Multer */
const multer = require('multer');
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

const uploadFile = multer({ storage: storage });

const productsController = require('../controllers/productosController');

/* Routes */
router.get('/login', usersController.login);
router.get('/register', usersController.create);

/* Propio */
router.get('/profile/:id', usersController.detail);


/* Admin */

router

module.exports = router;

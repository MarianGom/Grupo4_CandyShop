const express = require('express');
const usersController = require('../controllers/usersController');
const path = require('path');
const router = express.Router();
const { check } = require('express-validator');

/* Multer */
const multer = require('multer');

function createImageName(file) {
    return 'img-'+ Date.now() + '-' + file.originalname;
}

const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
        const publicFolder = path.join(
            __dirname,
            '../public/img/users'
        )
        cb(null, publicFolder);
    },
    filename: (req, file, cb) => {
        const newFileName = createImageName(file)  
        cb(null, newFileName);
    }
})

const uploadFile = multer({ storage: storage });


/* Validaciones - ExpressValidator */
let validateRegister = [
    check('mailUser')
        .notEmpty().withMessage('Completar el email.').bail()
        .isLength({ min: 6})
        .isEmail().withMessage('Tienes que ingresar un email válido.'),
    check('nombreUser')
        .notEmpty().withMessage('Completar el nombre.').bail()
        .isString(),
    check('apellidoUser')
        .notEmpty().withMessage('Completar el apellido.').bail()
        .isString(),
    check('password')
        .notEmpty().withMessage('Completar contraseña.').bail(),
    check('confirmPassword')
        .notEmpty().withMessage('Confirmar contraseña').bail()
];

/* Routes */
router.get('/login', usersController.login);
router.post('/login', usersController.log);

router.get('/register', usersController.create);
router.post('/register', validateRegister, usersController.store);

router.get('/profile/:id', usersController.show);

router.get('/edit/:id', usersController.edit); 
/* router.put('/edit/:id', uploadFile.single('image'), usersController.update); */



/* Admin */


module.exports = router;

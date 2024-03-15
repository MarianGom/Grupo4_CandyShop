const express = require('express');
const usersController = require('../controllers/usersController');
const path = require('path');
const router = express.Router();
const { body } = require('express-validator');

/* Multer */
const multer = require('multer');

function createImageName(file) {
    return 'img-'+ Date.now() + '-' + file.originalname;
}

const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
        const publicFolder = path.join(
            __dirname,
            '../public/img/usuarios'
        )
        cb(null, publicFolder);
    },
    filename: (req, file, cb) => {
        const newFileName = createImageName(file)  
        cb(null, newFileName);
    }
})

const uploadFile = multer({ storage: storage });


/* Middlewares */
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


/* Validaciones - ExpressValidator */
let validateRegister = [
    body('mailUser')
        .notEmpty().withMessage('Completar el email.').bail()
        .isLength({ min: 6})
        .isEmail().withMessage('Tienes que ingresar un email válido.'),
    body('nombreUser')
        .notEmpty().withMessage('Completar el nombre.').bail()
        .isLength({min : 2})
        .isString(),
    body('apellidoUser')
        .notEmpty().withMessage('Completar el apellido.').bail()
        .isLength({min : 2})
        .isString(),
    body('password')
        .notEmpty().withMessage('Completar contraseña.').bail()
        .isLength({min : 4}),
    body('confirmPassword')
        .notEmpty().withMessage('Confirmar contraseña').bail()
        .isLength({min : 4})
];
let validateEditUser = [
    body('mailUser')
        .notEmpty().withMessage('Completar el email.').bail()
        .isLength({ min: 6})
        .isEmail().withMessage('Tienes que ingresar un email válido.'),
    body('nombreUser')
        .notEmpty().withMessage('Completar el nombre.').bail()
        .isLength({min : 2})
        .isString(),
    body('apellidoUser')
        .notEmpty().withMessage('Completar el apellido.').bail()
        .isLength({min : 2})
        .isString(),
    body('password')
        .notEmpty().withMessage('Completar contraseña.').bail()
        .isLength({min : 4})
    ];

let validateLogin = [
    body('mail')
        .notEmpty().withMessage('Completar el email.').bail()
        .isLength({ min: 6})
        .isEmail().withMessage('Tienes que ingresar un email válido.'),
    body('password')
        .notEmpty().withMessage('Completar contraseña.').bail()
        .isLength({min : 4})
];

/* Routes */
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validateLogin, guestMiddleware, usersController.log);
router.get('/logout', authMiddleware, usersController.logout);

router.get('/register', guestMiddleware, usersController.create);
router.post('/register', validateRegister, guestMiddleware, usersController.store);

router.get('/myProfile', authMiddleware, usersController.showOne);

router.get('/edit', usersController.edit); 
router.put('/edit', uploadFile.single('image'),validateEditUser, usersController.update);

router.get('/changePassword', authMiddleware, usersController.passwordEdit);
router.put('/changePassword', authMiddleware, usersController.confirmPasswordEdit);

router.get('/delete', authMiddleware, usersController.delete); 
router.delete('/delete', authMiddleware, usersController.destroy);

/* Admin */
/* PARA REACT! router.get('/profile/:id', authMiddleware, usersController.showAll); */


module.exports = router;

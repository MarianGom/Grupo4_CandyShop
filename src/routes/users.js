const express = require('express');
const usersController = require('../controllers/usersController');
const path = require('path');
const router = express.Router();

/* const { body } = require('express-validator');

const User = require("../database/models"); */

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
const registerValidate = require('../middlewares/registerValidate');
const loginValidate = require('../middlewares/loginValidate');
const editValidate = require('../middlewares/editValidate');

/* Routes */

router.get('/login', guestMiddleware, usersController.login);
router.post('/login',  guestMiddleware, loginValidate, usersController.log);
router.get('/logout', authMiddleware, usersController.logout);

router.get('/register', guestMiddleware, usersController.create);
router.post('/register', guestMiddleware, registerValidate, usersController.store);

router.get('/myProfile', authMiddleware, usersController.showOne);

router.get('/edit', usersController.edit); 
router.put('/edit', uploadFile.single('image'),editValidate, usersController.update);

router.get('/changePassword', authMiddleware, usersController.passwordEdit);
router.put('/changePassword', authMiddleware, usersController.confirmPasswordEdit);

router.get('/changePic', authMiddleware, usersController.picEdit);
router.put('/changePic', authMiddleware, usersController.confirmPicEdit);

router.get('/delete', authMiddleware, usersController.delete); 
router.put('/delete', authMiddleware, usersController.destroy);

/* Admin */
/* PARA REACT! router.get('/profile/:id', authMiddleware, usersController.showAll); */

aaaa
module.exports = router;

const { body } = require('express-validator');

const validations = [
        body('mailUser')
        .notEmpty().withMessage('Completar el email.').bail()
        .isLength({ min: 6}).bail()
        .isEmail().withMessage('Tienes que ingresar un email válido.'),
    body('nombreUser')
        .notEmpty().withMessage('Completar el nombre.').bail()
        .isLength({min : 2}).withMessage('Debe contener mas de dos caracteres').bail()
        .isString(),
    body('apellidoUser')
        .notEmpty().withMessage('Completar el apellido.').bail()
        .isLength({min : 2}).withMessage('Debe contener mas de dos caracteres').bail()
        .isString(),
    body('password')
        .notEmpty().withMessage('Completar contraseña.').bail()
        .isLength({min : 8}).withMessage('Debe contener  minimo ocho caracteres'),
    body('confirmPassword')
        .notEmpty().withMessage('Confirmar contraseña').bail()
        .isLength({min : 8}).withMessage('Debe contener minimo ocho caracteres')
    ];

module.exports = validations;
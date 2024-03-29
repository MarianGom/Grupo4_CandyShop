const { body } = require("express-validator");
 
const editProductValidate = [
   body('nombre')
        .notEmpty().withMessage('Completar el campo nombre').bail()
        .matches(/^[a-zA-Z\s]+$/).withMessage('No se permiten numeros ni caracteres especiales').bail()
        .isLength({min: 3}).withMessage('El nombre debe contener minimo 3 caracteres'),
    body('sabor')
        .notEmpty().withMessage('Completar el campo sabor').bail()
        .matches(/^[a-zA-Z\s]+$/).withMessage('No se permiten numeros ni caracteres especiales').bail()
        .isLength({min : 5}).withMessage('El campo sabor debe contener minimo 5 caracteres'),
    body('descripcion')
        .notEmpty().withMessage('Completar el campo descripcion').bail()
        .isLength({min : 10}).withMessage('La descripcion debe contener minimo 10 caracteres').bail(),
    body('stock')
        .notEmpty().withMessage('Completar el campo stock').bail()
        .isInt().withMessage('No se permiten letras'),
    body('precio')
        .notEmpty().withMessage('Completar el campo precio').bail()
        .isFloat().withMessage('No se permiten letras'),
    body('categoriaProd')
        .notEmpty().withMessage('Seleccionar una categoria').bail()
];
module.exports = editProductValidate;
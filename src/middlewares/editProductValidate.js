const { body } = require("express-validator");
 
const editProductValidate = [
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

module.exports = editProductValidate;
const { body } = require("express-validator");
const db = require("../database/models");

const editValidate = [
    body('mailUser')
        .notEmpty().withMessage('Completar el email.').bail()
        .isEmail().withMessage('Tienes que ingresar un email válido.')
        .custom(async (value, {req}) =>{
            let userInDB = await db.Usuarios.findOne({
                where: {
                    email: req.body.mailUser
                }
            })
            if(userInDB){
                throw new Error("Correo electrónico asociado a otra cuenta")
            }
            return true;
        }),
        body('nombreUser')
        .notEmpty().withMessage('Completar el nombre.').bail()
        .matches(/^[a-zA-Z\s]+$/).withMessage('No se permiten numeros ni caracteres especiales').bail()
        .isLength({min : 2}).withMessage('Debe contener minimo dos caracteres'),
        body('apellidoUser')
        .notEmpty().withMessage('Completar el apellido.').bail()
        .matches(/^[a-zA-Z\s]+$/).withMessage('No se permiten numeros ni caracteres especiales').bail()
        .isLength({min : 2}).withMessage('Debe contener minimo dos caracteres'),
    body('telefono')
        .notEmpty().withMessage('Completar teléfono.').bail()
        .isLength({min : 8})
        .isInt()
    ];

module.exports = editValidate;

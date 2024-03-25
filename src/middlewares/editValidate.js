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
        .isLength({min : 2})
        .isString(),
    body('apellidoUser')
        .notEmpty().withMessage('Completar el apellido.').bail()
        .isLength({min : 2})
        .isString(),
    body('telefono')
        .notEmpty().withMessage('Completar teléfono.').bail()
        .isLength({min : 8})
    ];

module.exports = editValidate;

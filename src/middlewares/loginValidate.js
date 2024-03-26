const { body } = require("express-validator");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");

const loginValidate = [
    body('email')
        .notEmpty().withMessage('Completar el email.').bail()
        .isEmail().withMessage('Tienes que ingresar un email válido.').bail()
        .custom(async (value, {req}) =>{
            let userInDB = await db.Usuarios.findOne({
                where: {
                    email: req.body.email
                }
            })
            if(!userInDB){
                throw new Error('Las credenciales no coinciden.\nEmail o Contraseña incorrecta')
            }
            return true;
        }),
    body('password')
        .notEmpty().withMessage('Completar contraseña.').bail()
        .custom(async (value, { req }) => {
            const user = await db.Usuarios.findOne({ where: { email: req.body.email } });
            if (user) {
                const match = await bcryptjs.compare(value, user.password);
                if (!match) {
                    throw new Error('Las credenciales no coinciden.\nEmail o Contraseña incorrecta');
                }
            }
        })
];


module.exports = loginValidate;
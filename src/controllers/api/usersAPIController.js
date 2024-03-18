const path = require('path');
const bcryptjs = require('bcryptjs');

/* Models */
const db = require('../database/models');
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');

const Usuario = db.Usuarios;

const usersAPIController = {
    details: (req, res) => {
        let user = req.params.id;
        Movies
        .destroy({where: {id: user}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            console.log('confirm', confirm)
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/user/details/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/user/details/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    }

}

module.exports = usersAPIController;
const path = require('path');
const bcryptjs = require('bcryptjs');

/* Models */
const db = require('../database/models');
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');

const Usuario = db.Usuarios;

const usersAPIController = {
    allUsers: (req, res) => {
        Usuario.findAll()
        then(usuarios => {
            let consulta = {
                meta:{
                    status: 200,
                    total: usuarios.length,
                    url: 'api/usuarios'
                }
            }
            res.json(consulta)
        })
        .catch(error => console.log(error))
    },

    details: (req, res) => {
        let userId = req.params.id;
        Usuario.findOne({
            where: {
                id: userId,
                estado: 1,
            },
        })
        .then(usuarios => {
            let consulta = {
                meta:{
                    status: 200,
                    total: usuarios.length,
                    url: 'api/usuarios/:id'
                }
            }
        })
        .catch(error => console.log(error))
    },

}

module.exports = usersAPIController;
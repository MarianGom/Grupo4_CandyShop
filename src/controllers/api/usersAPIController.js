const path = require('path');
const bcryptjs = require('bcryptjs');

/* Models */
const db = require('../../database/models');
const sequelize = db.sequelize;

const Usuario = db.Usuarios;

const usersAPIController = {
    allUsers: async (req, res) => {
        try{

            let usuarios;

            const total = await Usuario.count();

            if(Object.keys(req.query).length !== 0 && req.query.page!= 0){

                let page = parseInt(req.query.page);

                let usersPorPagina = 10;
                /* let pages = (total - (total%usersPorPagina))/usersPorPagina; */

                usuarios = await Usuario.findAll({
                    where: {
                        estado: 1,
                    },
                    limit: usersPorPagina, 
                    offset: usersPorPagina*page
                });

            } else {

                usuarios = await Usuario.findAll({
                    attributes: ['id', 'nombre', 'email']
                });

            }
            

            let lista = JSON.parse(JSON.stringify(usuarios));
            lista.forEach(user => {
                let tinyURL = '/usuarios/' + user.id
                user.detail = tinyURL;
            });

            let consulta = {
                status: 200,
                /* total: usuarios.length, */
                url: 'api/usuarios'
            };

            return res.json({
                meta: consulta,
                count: total,
                data: lista
            });

        } catch(error) {
            return res.send(error);
        }
    },

    details: async (req, res) => {

        let userId = req.params.id;

        try{

            let usuario = await Usuario.findOne({
                attributes: [
                    'id',
                    'email',
                    'nombre',
                    'apellido',
                    'telefono',
                    'fotoPerfil'
                ],
                where: {
                    id: userId,
                }
            });

            let consulta = {
                status: 200,
                total: usuario.length,
                url: 'api/usuarios/:id'
            };

            return res.json({
                meta: consulta,
                data: usuario.dataValues
            });
    
        } catch(error) {
                return res.send(error)
        }
    },

    block: async (req, res, next) =>{

        let userId = req.params.id;

        try{

            let usuario = await Usuario.findOne({
                where: {
                    id: userId,
                },
            });

            const updateado = await Usuario.update(
                {
                    estado: 3,
                },{
                    where: {
                    id: userId,
                    },
                });

            let consulta = {
                status: 200,
                total: usuario.length,
                url: 'api/usuarios/block/:id'
            };

            return res.json({
                meta: consulta,
                data: usuario.dataValues
            });
    
        } catch(error) {
            return res.send(error);
        }

    },

    unblock: async (req, res, next) =>{

        let userId = req.params.id;

        try{

            let usuario = await Usuario.findOne({
                where: {
                    id: userId,
                },
            });

            const updateado = await Usuario.update(
                {
                    estado: 1,
                },{
                    where: {
                    id: userId,
                    },
                });

            let consulta = {
                status: 200,
                total: usuario.length,
                url: 'api/usuarios/block/:id'
            };

            return res.json({
                meta: consulta,
                data: usuario.dataValues
            });
    
        } catch(error) {
            return res.send(error);
        }

    },

}

module.exports = usersAPIController;
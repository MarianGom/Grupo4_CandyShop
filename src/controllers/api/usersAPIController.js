const path = require('path');
const bcryptjs = require('bcryptjs');

/* Models */
const db = require('../../database/models');
const sequelize = db.sequelize;

const Usuario = db.Usuarios;

const usersAPIController = {
    allUsers: async (req, res) => {
        try{

            let usuarios

            /* if(req.params.pag){
                const total = await Usuario.count();

                let usersPorPagina = 20;
                let pages = (total - (total%prodPorPagina))/prodPorPagina;

                usuarios = await Usuario.findAll({
                    where: {
                        estado: 1,
                    },
                    limit: usersPorPagina, 
                    offset: usersPorPagina*pages
                });

            } else {
            } */
            
            usuarios = await Usuario.findAll({
                attributes: ['id', 'nombre', 'email']
            });

            let consulta = {
                status: 200,
                /* total: usuarios.length, */
                url: 'api/usuarios'
            };

            let total = {
                total: usuarios.length
            }

            return res.json({
                meta: consulta,
                count: total,
                data: usuarios
            });

        } catch(error) {
            return res.send(error);
        }
    },

    details: async (req, res) => {

        let userId = req.params.id;

        try{

            let usuario = await Usuario.findOne({
                where: {
                    id: userId,
                },
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
const path = require('path');
const bcryptjs = require('bcryptjs');

/* Models */
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Usuario = db.Usuarios;

/* Paths */
const login = path.resolve(__dirname, '../views/usuarios/login.ejs');
const register = path.resolve(__dirname, '../views/usuarios/register.ejs');
const detail = path.resolve(__dirname, '../views/usuarios/detailProfile.ejs');
const editProfile = path.resolve(__dirname, '../views/usuarios/editProfile.ejs');
const deleteProfile = path.resolve(__dirname, '../views/usuarios/deleteProfile.ejs');
const goodbyeProfile = path.resolve(__dirname, '../views/adios.ejs');


/* Controller */
const usersController = {
    login: (req, res, next) => {
        /* Login Form */
        res.render(login, {});
    },

    log: async (req, res) => {
        let mailUser = req.body.email
        let password = bcryptjs.hashSync(req.body.password, 10)

        const datos = await Usuario.findOne({
            where: {
                email: mailUser
            }
        })

        try{
            
            if(datos){


                if(bcryptjs.compareSync(datos.password, password)){

                    console.log("\n\nSi se logueó\n\n")
                    res.render(detail, {user: datos})

                } else {

                    console.log("\n\nSi encontró datos, pero no se logueó\n\n")

                }

            } else {
                console.log("\n\nNo se encontró un usuario\n\n")
            }

            
        } catch(error){
            console.log(error)
            console.log("\n\nNo se pudo loguear\n\n")
        }
        res.render(register, {});
    },

    show: async (req, res) => {

        try{
            const datos = await Usuario.findOne({
                where: {
                    id: req.params.id,
                    estado: 1
                }
            })
            
            res.render(detail, {user: datos})
        } catch(error){
            console.log(error)
        }
        
    },

    create: (req, res, next) => {
        res.render(register, {});
    },

    store: async (req, res, next) => {
        const userNew = req.body;
        const error = '';
        let usuarioExistente = await Usuario.findOne({
            where: {
                email: userNew.mailUser
            }
        })

        console.log(usuarioExistente);

        if(usuarioExistente != null){
            let error = `\n\nEse mail ya está registrado\n\n`
            console.log(error)

            const oldData = req.body;

            res.render(register, {oldData: oldData, error: error})
            
        } else {
            await Usuario.create({
                nombre: userNew.nombreUser,
                apellido: userNew.apellidoUser,
                email: userNew.mailUser,
                password: bcryptjs.hashSync(userNew.password, 10),
                estado: 1,
                isAdmin: 0
            }).then(
                res.render(login,{})
            )
        }

    },

    edit: async (req, res, next) => {
 
        try{
            const datos = await Usuario.findOne({
                where: {
                    id: req.params.id, 
                    estado: 1
                }
            })
            
            res.render(editProfile, {user: datos})

        } catch(error){
            console.log(error)
        }
    },

    update: async (req, res, next) => {

        const userId = req.params.id;
        const user = req.body;

        await Usuario.update(
            {
                nombre: user.nombreUser,
                apellido: user.apellidoUser,
                email: user.mailUser,
                password: user.password,
                fotoPerfil: user.image,
                telefono: user.telefonoUser,
            },
            {
                where: {
                    id: userId
                }
            }
        )

        try{
            const datos = await Usuario.findOne({
                where: {
                    id: req.params.id
                }
            })
            
            res.render(editProfile, {user: datos})
        } catch(error){
            console.log(error)
        }
    },


    delete: async (req, res, next) =>{

        try{
            const datos = await Usuario.findOne({
                where: {
                    id: req.params.id
                }
            })
            
            res.render(deleteProfile, {user: datos})
        } catch(error){
            console.log(error)
        }

    },

    destroy: async (req, res, next) =>{
        
        try{

            const userId = req.params.id;

            await Usuario.update(
                {
                    estado: 2,
                },
                {
                    where: {
                        id: userId
                    }
                }
            )
            
            res.render(goodbyeProfile, {});
            
        } catch(err){
            console.log(err.message)    
        }
        
    }

    

    /* Para lo del admin */

    /* 
    const isAdmin = (req, res) => {
        if(req.session.admin){

        } else {
            res.redirect('/login')
        }
    }
    */

};

module.exports = usersController;
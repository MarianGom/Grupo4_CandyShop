const path = require('path');

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
        let password = req.body.password

        try{
            const datos = await Usuario.findOne({
                where: {
                    email: mailUser
                }
            })

            if(datos.password == password){
                res.render(detail, {user: datos})
            }
            
        } catch(error){
            console.log(error)}
        

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

        await Usuario.create({
            nombre: userNew.nombreUser,
            apellido: userNew.apellidoUser,
            email: userNew.mailUser,
            password: userNew.password,
            /* password: bcryptjs.hashSync(userNew.password, 10), */
            estado: 1,
            isAdmin: 0
        }).then(
            res.render(login,{})
        )

        console.log(`\n\nPasó el registro\n\n`);

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
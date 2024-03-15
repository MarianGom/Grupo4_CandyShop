const path = require('path');
const bcryptjs = require('bcryptjs');

/* Models */
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');
const Usuario = db.Usuarios;

/* Paths */
const login = path.resolve(__dirname, '../views/usuarios/login.ejs');
const register = path.resolve(__dirname, '../views/usuarios/register.ejs');
/* PARA REACT! const detail = path.resolve(__dirname, '../views/usuarios/detailProfile.ejs'); */
const myProfile = path.resolve(__dirname, '../views/usuarios/detailProfile.ejs');
const editProfile = path.resolve(__dirname, '../views/usuarios/editProfile.ejs');

const editPass = path.resolve(__dirname, '../views/usuarios/changePassword.ejs');

const deleteProfile = path.resolve(__dirname, '../views/usuarios/deleteProfile.ejs');
const goodbyeProfile = path.resolve(__dirname, '../views/adios.ejs');


/* Controller */
const usersController = {
    login: (req, res, next) => {
        /* Login Form */
        console.log(req.session);
        res.render(login, {});
    },

    log: async (req, res) => {
        let mailUser = req.body.email;
        let passwordRaw = req.body.password;
        /* let password = bcryptjs.hashSync(req.body.password, 10); */


        const usuario = await Usuario.findOne({
            where: {
                email: mailUser
            }
        })

        const datos = usuario.dataValues;
        const validacion = bcryptjs.compareSync(passwordRaw, datos.password);

        try{
            
            if(datos){

                if(validacion){
                    /* Log Exitoso */
                    let dataSession = datos;
                    delete dataSession.password;
                    delete dataSession.fotoPerfil;
                    delete dataSession.telefono;
                    
                    req.session.usuario = dataSession;

                    console.log(req.session.usuario);

                    res.redirect("/user/myProfile");

                } else {   
                    /* Error en validación */
                    console.log("\nLos datos enviados no son correctas\n");
                    res.render(login, {});
                }
            } 
            
        } catch(error){
            console.log(error)
            console.log("\n\nNo se pudo loguear\n\n")
            res.render(login, {});
        }
    },

    logout: (req,res)=> {
        req.session.destroy();
        return res.redirect('/')
    },

    showOne: async (req, res, next) =>{
        const idUsuarioOn = req.session.usuario.id;

        try{
            const misDatos = await Usuario.findOne({
                where: {
                    id: idUsuarioOn,
                    estado: 1
                }
            });

            res.render(myProfile,  {user: misDatos});
        } catch (error){
            console.log(error);
        }
    },

    create: (req, res, next) => {
        res.cookie('testing', 'Hola Mundo', { maxAge: 1000*30 })
        res.render(register, {});
    },

    /* store: (req, res) =>{
        const resultValidation = validationResult(req);
        console.log(resultValidation.errors)
        if( resultValidation.errors.length > 0){
            return res.render('register', {
                errors: resultValidation.mapped()
            });
        } 
    }, */
    
    
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
            console.log(error);

            const oldData = req.body;

            res.render(register, {oldData: oldData, error: error})
            
        } else {

            /* Re-Chequear los campos por si las moscas */

            /* const password = userNew.password.slice(16); */

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

        const userId = req.session.usuario.id;
        console.log(`\n\n${userId}\n\n`);
        try{
            const datos = await Usuario.findOne({
                where: {
                    id: userId, 
                    estado: 1
                }
            })
            
            res.render(editProfile, {user: datos})

        } catch(error){
            console.log(error)
        }
    },

    update: async (req, res, next) => {

        const userId = req.session.usuario.id;
        const user = req.body;

        await Usuario.update(
            {
                nombre: user.nombreUser,
                apellido: user.apellidoUser,
                email: user.mailUser,
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
                    id: userId
                }
            })
            
            res.render(editProfile, {user: datos})
        } catch(error){
            console.log(error)
        }
    },

    passwordEdit: (req, res, next) => {

        try{
           /*  const datos = await Usuario.findOne({
                where: {
                    id: req.session.usuario.id, 
                    estado: 1
                }
            }) */
            
            res.render(editPass, {});

        } catch(error){
            console.log(error);
        }
    },

    confirmPasswordEdit: async (req, res, next) => {

        const userId = req.session.usuario.id;
        const user = req.body;

        await Usuario.update(
            {
                password: user.password
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
                    id: userId
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

    /*  PARA REACT!

    showAll: async (req, res) => {

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
        
    }, */

};

module.exports = usersController;
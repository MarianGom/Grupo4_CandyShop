const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const { findAll, findOne , create} = require('../models/user.model');
const { json } = require('body-parser');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

/* Paths */
const login = path.resolve(__dirname, '../views/usuarios/login.ejs');
const register = path.resolve(__dirname, '../views/usuarios/register.ejs');
const detail = path.resolve(__dirname, '../views/usuarios/detailProfile.ejs');
const editProfile = path.resolve(__dirname, '../views/usuarios/editProfile.ejs');
const deleteProfile = path.resolve(__dirname, '../views/usuarios/deleteProfile.ejs');

/* DBs */
const Usuario = db.Usuario;


/* Controller */

const usersController = {
    login: (req, res, next) => {
        res.render(login, {});
    },

    log: (req, res) => {
        let datos = req.body
        res.render(register, {});
    },

    show: async (req, res) => {

        /* JSON */
        /* const idUsuario = req.params.id;
        const datos = Usuario.findOne({
            where:{
                idUser : idUsuario
            }
        }).then(
            res.render(detail, {user: datos})
        ) */


        /* ORM */
        try{
            const datos = await Usuario.findOne({
                where: {
                    idUser: req.params.id
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

        /* JSON */

        /* delete userNew.confirmPassword;
        userNew.perfilUser = "cliente";
        userNew.fotoPerfil = "default";
        userNew.estado = true; 
        
        try{
            create(userNew);
            res.redirect('/user/login');
        } catch(error){
            console.log(error)
        } */


        /* ORM */

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
        
        /* JSON */
        /* const idUsuario = req.params.id;
        const user = req.body;
        const datos = findOne(idUsuario);
        res.render(editProfile, {user: datos}); */


        /* ORM */
        try{
            const datos = await Usuario.findOne({
                where: {
                    idUser: req.params.id
                }
            })
            
            res.render(editProfile, {user: datos})
        } catch(error){
            console.log(error)
        }
    },

    update: async (req, res, next) => {

        /* JSON */
        /* const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/usersDataBase.json")));
        let idUser = req.params.id;

        const userUpd = users.map(user => {
            if(user.idUser == idUser){ 
                user.idUser = parseInt(req.params.id);
                user.nombreUser = req.body.nombreUser;
                user.apellidoUser = req.body.apellidoUser;
                user.mailUser = req.body.mailUser;
                user.password = req.body.password;
                try{
                    user.fotoPerfil = req.file ? req.file.filename : req.body.oldImagen;
                } catch(error) {
                    console.log(error)
                }
                user.perfilUser = req.body.perfilUser;
                user.estado = true;
            }
        })

        try{
            const usersUpdates = JSON.stringify(users, null, 2);
            console.log('Si entró al primer try \n\n');
            try{
                fs.writeFileSync(path.resolve(__dirname, "../data/usersDataBase.json"), usersUpdates);
                res.redirect('/listadoProductos/');
            } catch(error){
                console.log("Eh no pa");
                res.redirect('/listadoProductos/');
            }
        } catch(error){
            console.log(error);
        } */



        /* ORM */

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
                    idUser: userId
                }
            }
        )

        try{
            const datos = await Usuario.findOne({
                where: {
                    idUser: req.params.id
                }
            })
            
            res.render(editProfile, {user: datos})
        } catch(error){
            console.log(error)
        }
    },




    /* Para lo del admin */

    /* 
    const isAdmin = (req, res) => {
        if(req.session.admin){

        } else {
            res.redirect('/login')
        }
    }
    */

    delete: async (req, res, next) =>{

        /* JSON */
        /* const idUsuario = req.params.id;
        const datos = findOne(idUsuario);
        res.render(deleteProfile, {user: datos});*/

        /* ORM */

        try{
            const datos = await Usuario.findOne({
                where: {
                    idUser: req.params.id
                }
            })
            
            res.render(deleteProfile, {user: datos})
        } catch(error){
            console.log(error)
        }

    },

    destroy: async (req, res, next) =>{
        /* JSON */
        /* let idUser = req.params.id;
        const usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/usersDataBase.json")));

        const userDel = usuarios.map(user => {
            if(user.idUser == idUser){ 
                user.idUser = parseInt(req.params.id);
                user.estado = false;
            }
        })

        try{
            const usersUpdates = JSON.stringify(usuarios, null, 2);
            console.log('Si entró al primer try \n\n');
            try{
                fs.writeFileSync(path.resolve(__dirname, "../data/usersDataBase.json"), usersUpdates);
                res.redirect('/listadoProductos/');
            } catch(error){
                console.log(error)
                res.redirect('/listadoProductos/');
            }
        } catch(error){
            console.log(error);
        }
        res.redirect('/listadoProductos/'); */


        /* ORM */
        const userId = req.params.id;

        await Usuario.update(
            {
                estado: 0,
            },
            {
                where: {
                    idUser: userId
                }
            }
        )
        res.redirect('/listadoProductos/')

    }
};

module.exports = usersController;
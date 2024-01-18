const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const { findAll, findOne , create} = require('../models/user.model');
const { json } = require('body-parser');

const login = path.resolve(__dirname, '../views/usuarios/login.ejs');
const register = path.resolve(__dirname, '../views/usuarios/register.ejs');
const detail = path.resolve(__dirname, '../views/usuarios/detailProfile.ejs');
const editProfile = path.resolve(__dirname, '../views/usuarios/editProfile.ejs');

const usersController = {
    login: (req, res, next) => {
        res.render(login, {});
    },

    log: (req, res) => {
        let datos = req.body
        res.render(register, {});
    },

    show: (req, res) => {
        const idUsuario = req.params.id;
        const datos = findOne(idUsuario);
        res.render(detail, {user: datos});
    },

    create: (req, res, next) => {
        res.render(register, {});
    },

    store: (req, res, next) => {
        const userNew = req.body;

        delete userNew.confirmPassword;

        userNew.perfilUser = "cliente";
        userNew.fotoPerfil = "default";
        userNew.estado = true;
        
        try{
            create(userNew);
            res.redirect('/user/login');
        } catch(error){
            console.log(error)
        }
    },

    edit: (req, res, next) => {
        const idUsuario = req.params.id;
        const datos = findOne(idUsuario);
        res.render(editProfile, {user: datos});
    },

    update: (req, res, next) => {
        const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/usersDataBase.json")));
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

    delete: (req, res, next) =>{
        res.redirect('/editarUser');
    }
};

module.exports = usersController;
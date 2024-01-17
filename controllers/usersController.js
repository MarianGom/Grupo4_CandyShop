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
        const profile = findOne(idUser);
        res.redirect('/editarUser');
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
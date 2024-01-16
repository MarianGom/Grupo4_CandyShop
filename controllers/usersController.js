const path = require('path');
const fs = require('fs');

const login = path.resolve(__dirname, '../views/usuarios/login.ejs');
const register = path.resolve(__dirname, '../views/usuarios/register.ejs');

const usersController = {
    login: (req, res, next) => {
        res.render(login, {});
    },

    detail: (req, res, next) =>{
        const profile = findOne(idUser);
        res.render(perfil, {profile : profile});
    },

    create: (req, res, next) => {
        res.render(register, {});
    },

    store: (req, res, next) => {
        const userNew = req.body
        res.render();

        create(userNew);
        res.redirect('/login');
    },

    edit: (req, res, next) => {
        res.render('/editarUser');
    },

    update: (req, res, next) => {
        res.redirect('/editarUser');
    },

    delete: (req, res, next) =>{
        res.redirect('/editarUser');
    }
};

module.exports = usersController;
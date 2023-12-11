const path = require('path');
const login = path.resolve(__dirname, '../views/usuarios/login.ejs');
const register = path.resolve(__dirname, '../views/usuarios/register.ejs');

const usersController = {
    login: (req, res, next) => {
        res.render(login, {});
    },
    add: (req, res, next) => {
        res.render(register, {});
    }
};

module.exports = usersController;
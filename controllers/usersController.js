const path = require('path');

const usersController = {
    login: (req, res, next) => {
        res.render('login', {});
    },
    add: (req, res, next) => {
        res.render('register', {});
    }
};

module.exports = usersController;
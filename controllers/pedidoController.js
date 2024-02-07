const path = require('path');

const carritoController = {
    index: (req, res, next) => {
        res.render('productCart', {});
    },
    show: (req, res, next) => {
        res.render('', {})
    }
}

module.exports = carritoController;
const path = require('path');
const mainProduct = path.resolve(__dirname, '../views/productos/productoDetail.ejs');

const productosController = {
    index: (req, res, next) => {
        res.render(mainProduct, {});
    },
    show: (req, res, next) => {
        res.render('productDetail', {})
    },
    
}

module.exports = productosController;








/*const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productosController = {
    index: (req, res, next) => {
        res.render('home', {});
    },
    show: (req, res, next) => {
        res.render('productDetail', {})
    },
    edit: (req, res, next) => {
        res.render('productEdit', {})
    }
}

module.exports = productosController;*/
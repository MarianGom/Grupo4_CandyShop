const path = require('path');

const mainProduct = path.resolve(__dirname, '../views/productos/listProductos.ejs');
const createProduct = path.resolve(__dirname, '../views/productos/crearProductos.ejs');
const editProduct = path.resolve(__dirname, '../views/productos/editarProductos.ejs');

const productosController = {
    index:(req, res, next) => {
        res.render(mainProduct , {});
      },

    show: (req, res, next) => {
        res.render('productDetail', {})
    },

    create:(req, res, next) => {
        res.render(createProduct, {})
    },
    store:(req, res, next) => {

    }
    ,

    edit: (req, res, next) => {
        res.render(editProduct, {})
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
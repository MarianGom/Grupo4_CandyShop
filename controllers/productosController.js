const path = require('path');
const fs = require('fs');

const mainProduct = path.resolve(__dirname, '../views/productos/listProductos.ejs');
const createProduct = path.resolve(__dirname, '../views/productos/crearProductos.ejs');
const editProduct = path.resolve(__dirname, '../views/productos/editarProductos.ejs');
const detailProduct = path.resolve(__dirname, '../views/productos/productoVer.ejs');

const { findAll, findOne , create} = require('../models/product.model')

const productosController = {
    index:(req, res) => {
        const products = findAll()
        res.render(mainProduct, {products: products});
    },

    detail: (req, res) => {
        console.log("llego a detail", req.params.id)
        const idProduct = req.params.id
        console.log(idProduct)
        const product = findOne(idProduct)
        console.log("El producto es ", product)
        res.render(detailProduct, {product : product})
    },

    create:(req, res) => {
        res.render(createProduct, {})
    },
    
    store:(req, res) => {
        const product = req.body
        product.fotoProd = req.file.filename
        create(product)
        res.redirect('/')
    },

    edit: (req, res) => {
        const idProduct = req.params.id
        const product = findOne(idProduct)
        res.render(editProduct, {productToEdit: product})
    },

   update: (req, res) => {
        // Lógica para actualizar el producto con el ID proporcionado en req.params.id
        // ...
        res.send('Actualización exitosa'); 
    },

    delete: (req, res) => {
        console.log("query", req.query._method)
        res.status().send({message: "OK"})
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
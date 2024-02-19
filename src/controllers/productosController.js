const path = require('path');

/* 
const fs = require('fs');

const { findAll, findOne , create} = require('../models/product.model');
const { json } = require('body-parser'); */

/* Models */
const db = require('../database/models');
const Producto = db.Productos;
const Categoria = db.Categorias;
const InfoNutricional = db.Infos;

const mainProduct = path.resolve(__dirname, '../views/productos/listProductos.ejs');
const createProduct = path.resolve(__dirname, '../views/productos/crearProductos.ejs');
const editProduct = path.resolve(__dirname, '../views/productos/editarProductos.ejs');
const detailProduct = path.resolve(__dirname, '../views/productos/productoVer.ejs');
const deleteProduct = path.resolve(__dirname, '../views/productos/borrarProductos.ejs');


const productosController = {

    index: async (req, res) => {

        const categorias = await Categoria.findAll({
        })

        const products = await Producto.findAll({
            where: {
                estado: 1
            }
        })

        res.render(mainProduct, {products: products, categorias: categorias})
    },

    detail: async (req, res) => {

        const datos = await Producto.findOne({
            where: {
                id: req.params.id
            }
        })
        res.render(detailProduct, {product: datos});
    },

    create: (req, res) => {

        res.render(createProduct, {})
    },
    
    store: async (req, res) => {

        const foto = req.file ? req.file.filename : req.body.oldImagen;

        await Producto.create({
            nombre: req.body.nombre,
            sabor: req.body.sabor,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
            fotoProd: foto || 'noImagen.png',
            estado: 1,
            idNutri: 1,
            idCat: 1,
        })

        res.redirect('/listadoProductos/');
    },

    edit: async (req, res) => {

        const datos = await Producto.findOne({
            where:{
                id: req.params.id
            }
        })
        res.render(editProduct, {productToEdit: datos})
    },

    update: async (req, res) => {

        const foto = req.file ? req.file.filename : req.body.oldImagen;

        await Producto.update({
            nombre: req.body.nombre,
            sabor: req.body.sabor,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
            fotoProd: foto || 'noImagen.png',
            estado: 1,
            idNutri: 1,
            idCat: 1,
        },{
            where:{
                idProd: req.params.id
            }
        })

        res.redirect('/listadoProductos/');
    },

    delete: async (req, res) => {

        const idProduct = req.params.id
        const datos = await Producto.findOne({
            where: {
                id: idProduct
            }
        })
        res.render(deleteProduct, {product: datos})
    },

    destroy: async (req, res) => {
        
        const idProduct = req.params.id
        await Producto.update({
            estado: 0,
        },{
            where:{
                id: idProduct
            }
        })

        res.redirect('/listadoProductos/');
    },  
}

module.exports = productosController;

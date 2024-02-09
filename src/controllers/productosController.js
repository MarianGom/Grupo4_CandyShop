const path = require('path');
const fs = require('fs');

const { findAll, findOne , create} = require('../models/product.model');
const { json } = require('body-parser');

/* Models */
const db = require('../database/models');
const Producto = db.Producto;
const Categoria = db.Categoria;
const InfoNutricional = db.InfoNutricional;

const mainProduct = path.resolve(__dirname, '../views/productos/listProductos.ejs');
const createProduct = path.resolve(__dirname, '../views/productos/crearProductos.ejs');
const editProduct = path.resolve(__dirname, '../views/productos/editarProductos.ejs');
const detailProduct = path.resolve(__dirname, '../views/productos/productoVer.ejs');
const deleteProduct = path.resolve(__dirname, '../views/productos/borrarProductos.ejs');


const productosController = {
    index: async (req, res) => {
        /* JSON */

        /* const products = findAll()
        res.render(mainProduct, {products: products}); */

        /* ORM */
        const products = await Producto.findAll({
            where: {
                estado: 1
            }
        })
        res.render(mainProduct, {products: products})
    },

    detail: async (req, res) => {
        /* JSON */
        /* const product = findOne(idProduct)
        console.log("El producto es ", product)
        res.render(detailProduct, {product : product}) */

        const datos = await Producto.findOne({
            where: {
                idProd: req.params.id
            }
        })
        res.render(detailProduct, {product: datos});
    },

    create: (req, res) => {
        res.render(createProduct, {})
    },
    
    store: async (req, res) => {
        /* JSON */
        /* console.log("entro por el controller, req.body ", req.body)
		console.log("entro por el controller, req.file ", req.file)
        console.log("req.body", req.body);
        const productNew = req.body
        productNew.fotoProd = req.file.filename
        create(productNew)
        res.redirect('/listadoProductos/') */

        /* ORM */

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
        /* JSON */
        /* const idProduct = req.params.id
        const product = fi.id.idndOne(idProduct)
        res.render(editProduct, {productToEdit: product}) */

        /* ORM */
        const datos = await Producto.findOne({
            where:{
                idProd: req.params.id
            }
        })
        res.render(editProduct, {productToEdit: datos})
    },

    update: async (req, res) => {
        /* JSON */
        /* const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/productsDataBase.json")));

        let idProducto = req.params.id;

        const productUpdate = products.map(prod => {
            if(prod.idProd == idProducto){ 
                prod.idProd = parseInt(req.params.id);
                prod.nombreProd = req.body.nombreProd;
                prod.precioProd = parseFloat(req.body.precioProd);
                prod.stock = parseInt(req.body.stock);
                try{
                    prod.fotoProd = req.file ? req.file.filename : req.body.oldImagen;
                } catch(error) {
                    console.log(error)
                }
                prod.descripcionProd = req.body.descripcionProd;
                prod.categoriaProd = req.body.categoriaProd;
                prod.tipoProd = req.body.tipoProd;
            }
        })
        
        try{
            const prodUpdates = JSON.stringify(products, null, 2);
            try{
                fs.writeFileSync(path.resolve(__dirname, "../data/productsDataBase.json"), prodUpdates);
                res.redirect('/listadoProductos/');
            } catch(error){
                console.log("Eh no pa");
                res.redirect('/listadoProductos/');
            }
        } catch(error){
            console.log(error);
        } */
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
        /* JSON */
        /* const idProduct = req.params.id
        const product = findOne(idProduct)
        res.render(deleteProduct, {product: product}) */

        /* ORM */
        const idProduct = req.params.id
        const datos = await Producto.findOne({
            where: {
                idProd: idProduct
            }
        })
        res.render(deleteProduct, {product: datos})
    },

    destroy: async (req, res) => {
        /* JSON */
        /* let idProducto = req.params.id;

        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/productsDataBase.json")));

        const productDel = products.map(prod => {
            if(prod.idProd == idProducto){ 
                prod.idProd = parseInt(req.params.id);
                prod.estado = false;
            }
        })

        try{
            const prodUpdates = JSON.stringify(products, null, 2);
            console.log('Si entró al primer try \n\n');
            try{
                fs.writeFileSync(path.resolve(__dirname, "../data/productsDataBase.json"), prodUpdates);
                res.redirect('/listadoProductos/');
            } catch(error){
                console.log(error)
                res.redirect('/listadoProductos/');
            }
        } catch(error){
            console.log(error);
        }

        res.redirect('/listadoProductos/'); */


        /* ORM */
        const idProduct = req.params.id
        await Producto.update({
            estado: 0,
        },{
            where:{
                idProd: idProduct
            }
        })

        res.redirect('/listadoProductos/');
    },  
}

module.exports = productosController;

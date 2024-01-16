const path = require('path');
const fs = require('fs');

const mainProduct = path.resolve(__dirname, '../views/productos/listProductos.ejs');
const createProduct = path.resolve(__dirname, '../views/productos/crearProductos.ejs');
const editProduct = path.resolve(__dirname, '../views/productos/editarProductos.ejs');
const detailProduct = path.resolve(__dirname, '../views/productos/productoVer.ejs');

const { findAll, findOne , create} = require('../models/product.model');
const { json } = require('body-parser');

const productosController = {
    index:(req, res) => {
        const products = findAll()
        res.render(mainProduct, {products: products});
    },

    detail: (req, res) => {
        const product = findOne(idProduct)
        console.log("El producto es ", product)
        res.render(detailProduct, {product : product})
    },

    create:(req, res) => {
        res.render(createProduct, {})
    },
    
    store:(req, res) => {
        console.log("entro por el controller, req.body ", req.body)
		console.log("entro por el controller, req.file ", req.file)
        console.log("req.body", req.body);

        const productNew = req.body
        productNew.fotoProd = req.file.filename

        create(productNew)
        res.redirect('/listadoProductos/')
    },

    edit: (req, res) => {
        const idProduct = req.params.id
        const product = findOne(idProduct)
        res.render(editProduct, {productToEdit: product})
    },

   update: (req, res) => {
        console.log("Llego update");
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/productsDataBase.json")));

        /* req.body.idProd = parseInt(req.params.id);
        req.body.fotoProd = req.file ? req.file.filename : req.body.oldImagen;
        const productUpdate = products.map (prod => {
            if(prod.idProd == req.body.id){ 
                prod = req.body;
                prod.fotoProd = req.body.fotoProd;
                console.log("req.body", req.body);  
                return prod;
            }
            
            return prod;
        }) */

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

        console.log('Si terminó de crear el objeto \n'+ JSON.stringify(products) + '\n');

        
        try{
            const prodUpdates = JSON.stringify(products, null, 2);
            console.log('Si entró al primer try \n\n');
            try{
                fs.writeFileSync(path.resolve(__dirname, "../data/productsDataBase.json"), prodUpdates);
                /* res.send('Actualización exitosa'); */
                res.redirect('/listadoProductos/');
            } catch(error){
                console.log("Eh no pa");
                res.redirect('/listadoProductos/');
            }
        } catch(error){
            console.log(error);
        }
        
        
    },

    delete: (req, res) => {
        /* console.log("query", req.query)

        res.status().send({message: "OK"}) */

        console.log('\n\n\nEntra en borrar\n\n\n')

        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/productsDataBase.json")));

        let idDelete = req.params.id;
        let position;

        products =  products.filter(function(prod){
            if(celular.id != idDelete){
                position = products.findIndex(celular)
            }
        })

        console.log(products);

        try{
            fs.writeFileSync(path.resolve(__dirname, "../data/productsDataBase.json"), products);
            res.redirect('/listadoProductos/');
        } catch(error){
            console.log(error);
            res.redirect('/listadoProductos/');
        }
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
const path = require('path');

/* Models */
const db = require('../database/models');
const Producto = db.Productos;
const Categoria = db.Categorias;
const Info = db.Infos;
const { validationResult } = require("express-validator");

const mainProduct = path.resolve(__dirname, '../views/productos/catalogoProductos.ejs');
const listProduct = path.resolve(__dirname, '../views/productos/listProductos.ejs');
const detailProduct = path.resolve(__dirname, '../views/productos/detalleProductos.ejs');
const createProduct = path.resolve(__dirname, '../views/productos/crearProductos.ejs');
const editProduct = path.resolve(__dirname, '../views/productos/editarProductos.ejs');
const deleteProduct = path.resolve(__dirname, '../views/productos/borrarProductos.ejs');


const productosController = {

    index: async (req, res) => {

        const categorias = await Categoria.findAll({
        })

        const prodPorPagina = 12;

        try{
            
            var pag = req.params.pag
            
            if(req.params.cat){
                
                const catt = req.params.cat;

                const total = await Producto.count({
                    attributes:{
                        include:[
                            [db.sequelize.col('Categorias.id'), 'IdCat']
                        ]
                    },
                    include:[{
                        model: Categoria,
                        as: 'Categorias',
                        attributes: [],
                    }],
                    where:{
                        estado: 1,
                        IdCat: catt
                    }
                })
    
                var pages = (total - (total%prodPorPagina))/prodPorPagina;

                const products = await Producto.findAll({
                    attributes:{
                        include:[
                            [db.sequelize.col('Categorias.nombre'), 'categoria'],
                            [db.sequelize.col('Categorias.id'), 'IdCat']
                        ]
                    },
                    include:[{
                        model: Categoria,
                        as: 'Categorias',
                        attributes: [],
                    }],
                    where: {
                        estado: 1,
                        IdCat: catt
                    },
                    limit: prodPorPagina, 
                    offset: prodPorPagina*pag
                })

                let paginas = [];

                for(let i=0 ; i<=pages ; i++ ){
                    paginas.push(i);
                }
    
                res.render(mainProduct, {products: products, categorias: categorias, paginas: paginas, paginaActual: parseInt(pag)})

            } else {

                const total = await Producto.count({
                    where:{
                        estado: 1
                    }
                });
        
                var pages = (total - (total%prodPorPagina))/prodPorPagina;

                const products = await Producto.findAll({
                    attributes:{
                        include:[
                            [db.sequelize.col('Categorias.nombre'), 'categoria']
                        ]
                    },
                    include:[{
                        model: Categoria,
                        as: 'Categorias',
                        attributes: [],
                    }],
                    where: {
                        estado: 1
                    },
                    limit: prodPorPagina, 
                    offset: prodPorPagina*pag
                })

                let paginas = [];

                for(let i=0 ; i<=pages ; i++ ){
                    paginas.push(i);
                }
    
                res.render(mainProduct, {products: products, categorias: categorias, paginas: paginas, paginaActual: parseInt(pag)})
            }
            
        } catch(error){

            console.log(`\n\n${error}\n\n`);

        }

    },

    detail: async (req, res) => {

        try{
            const datos = await Producto.findOne({
                attributes:{
                    include:[
                        [db.sequelize.col('Categorias.nombre'), 'categoria'],
                        [db.sequelize.col('Infos.valorEnerg'), 'valorEnerg'],
                        [db.sequelize.col('Infos.porcion'), 'porcion'],
                        [db.sequelize.col('Infos.proteina'), 'proteina'],
                        [db.sequelize.col('Infos.sodio'), 'sodio'],
                        [db.sequelize.col('Infos.grasaTotal'), 'grasaTotal'],
                        [db.sequelize.col('Infos.grasaSaturada'), 'grasaSaturada'],
                        [db.sequelize.col('Infos.grasaTrans'), 'grasaTrans'],
                        [db.sequelize.col('Infos.fibraAlim'), 'fibraAlim'],
                        [db.sequelize.col('Infos.otros'), 'otros']
                    ]
                },
                include:[{
                    model: Categoria,
                    as: 'Categorias',
                    attributes: [],
                },{
                    model: Info,
                    as: 'Infos',
                    attributes: [],
                }],
                where: {
                    id: req.params.id,
                }
            });
    
            res.render(detailProduct, {product: datos});

        }catch(error){
            console.log(`\n• Error: ${error}\n`)
        }
    },


    /* 4Admin */

    list: async (req, res) => {

        const total = await Producto.count({
            where:{
                estado: 1
            }
        })

        const prodPorPagina = 10;

        var pages = (total - (total%prodPorPagina))/prodPorPagina;
        var pag = req.params.pag
        
        try{
            const products = await Producto.findAll({
                attributes:{
                    include:[
                        [db.sequelize.col('Categorias.nombre'), 'categoria']
                    ]
                },
                include:[{
                    model: Categoria,
                    as: 'Categorias',
                    attributes: [],
                }],
                where: {
                    estado: 1
                },
                limit: prodPorPagina, 
                offset: prodPorPagina*pag
            })

            /* COMMENT!!! Para ver la consulta de arriba */
            /* console.log("\n\n")
            products.forEach(productoaver => {
                console.log(`•${productoaver.nombre} - Categoria: ${productoaver.dataValues.categoria}`)
            });
            console.log("\n\n") */

            let paginas = [];

            for(let i=0 ; i<=pages ; i++ ){
                paginas.push(i);
            }

            res.render(listProduct, {products: products, paginas: paginas, paginaActual: parseInt(pag)})
            
        } catch(error){
            console.log(`\n\n${error}\n\n`);
        }
    },

    create:async (req, res) => {
        const categorias = await Categoria.findAll();
        res.render(createProduct, { categorias })
    },
    
    store: async (req, res) => {
        const resultValidation = validationResult(req);
        if (!resultValidation.isEmpty()) {
          return res.render(createProduct, {
            errors: resultValidation.mapped()});
        }
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
            idCat: req.body.categoriaProd,
        })
        res.redirect('/productos/all/0');
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

        const resultValidation = validationResult(req);
        if (!resultValidation.isEmpty()) {
          return res.render(editProduct, {
            errors: resultValidation.mapped()});
        }
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
            idCat: req.body.categoriaProd,
        },{
            where:{
                idProd: req.params.id
            }
        })

        res.redirect('/productos/all/0');
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

        res.redirect('/productos/all/0');
    },  
}

module.exports = productosController;

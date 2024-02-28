const path = require("path");

const db = require('../database/models');
const Producto = db.Productos;
const Categoria = db.Categorias;

const mainProduct = path.resolve(__dirname, '../views/productos/productoDetail.ejs');
const carrito = path.resolve(__dirname, '../views/productos/productCart.ejs');
const error = path.resolve(__dirname, '../views/error.ejs');

const mainController = {
    index: async (req, res, next) => {

        const categorias = Categoria.findAll();

        /* 
        const ultimos = await Producto.findAll({
            where: {
                estado: 1
            },
            order: [['id', 'DESC']],
            limit: 3
        })
        */

        res.render("home", {categorias: categorias});
    },

    info: (req, res, next) => {
        res.render("nosotros", {});
    },

    productos:(req, res, next) => {
        res.render(mainProduct , {});
    },
    
    carrito:(req, res, next) => {
        res.render(carrito , {});
    },

    error:(req, res, next) => {
        res.render(error , {});
    },   
};

module.exports = mainController;



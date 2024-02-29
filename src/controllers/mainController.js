const path = require("path");

const db = require('../database/models');
const {sequelize} =  db;
const Producto = db.Productos;
const Item = db.Items;
const Categoria = db.Categorias;

const mainProduct = path.resolve(__dirname, '../views/productos/productoDetail.ejs');
const carrito = path.resolve(__dirname, '../views/productos/productCart.ejs');
const error = path.resolve(__dirname, '../views/error.ejs');

const mainController = {
    index: async (req, res, next) => {

        const categorias = Categoria.findAll();
        const ultimos = await Producto.findAll({
            where: {
                estado: 1
            },
            order: [['id', 'DESC']],
            limit: 3
        });

        const masPedidos = await Item.findAll({
            attributes:[
                'idProd',
                [db.sequelize.fn('COUNT', db.sequelize.col('idProd')), 'total']
            ],
            where: {
                estado: 1
            },
            group: 'idProd',
            order: [[sequelize.literal('total'), 'DESC']],
            limit: 3
          });


        res.render("home", {ultimosProductos: ultimos, pedidos: masPedidos});
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



const path = require("path");

const db = require('../database/models');
const { sequelize } = db;
const { QueryTypes } = require('sequelize');

const Item = db.Items;
const Producto = db.Productos;
const Categoria = db.Categorias;

const mainProduct = path.resolve(__dirname, '../views/productos/productoDetail.ejs');
const carrito = path.resolve(__dirname, '../views/productos/productCart.ejs');
const error = path.resolve(__dirname, '../views/error.ejs');


const mainController = {
    index: async (req, res, next) => {

        const categorias = Categoria.findAll();

        const ultimos = await Producto.findAll({
            attributes:{
                include:[
                    [sequelize.col('Categorias.nombre'), 'categoria']
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
            order: [['id', 'DESC']],
            limit: 3
        });

        /* COMMENT!!! Para ver como funciona la consulta */
        /* ultimos.forEach(prod => {
            console.log(`• ${prod.nombre} - Categoria: ${prod.dataValues.categoria}`);
        }); */

        
        /* COMMENT!!! Para salir del apuro, y no tener que usar la query de SQL pura, descomentar y retornar top1, top2 y top3*/
        /* const masPedidos = await Item.findAll({
            attributes:[
                'idProd',
                [sequelize.fn('COUNT', sequelize.col('idProd')), 'total']
            ],
            where: {
                estado: 1
            },
            group: 'idProd',
            order: [[sequelize.literal('total'), 'DESC']],
            limit: 3
        });
        var ids = []
        masPedidos.forEach(element => {
            ids.push(element.idProd);
        });

        const top1 = await Producto.findOne({
            where:{
                id: ids[0]
            }
        });
        const top2 = await Producto.findOne({
            where:{
                id: ids[1]
            }
        })
        const top3 = await Producto.findOne({
            where:{
                id: ids[2]
            }
        })  */

        try {

            const resultado = await sequelize.query("SELECT Productos.*, count(items.idProd) AS total, Categorias.nombre as categoria FROM categorias, productos AS Productos INNER JOIN items ON items.idProd = productos.id WHERE Productos.estado = 1 AND Categorias.id = Productos.idCat GROUP BY idProd ORDER BY total DESC LIMIT 3", {type: QueryTypes.SELECT})

            res.render("home", {ultimosProductos: ultimos, masVendidos: resultado});

        } catch (error) {

            console.error('Error al realizar la consulta: ', error);

        }
            
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



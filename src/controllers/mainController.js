const path = require("path");

const db = require('../database/models');
const { sequelize } = db;
const { QueryTypes } = require('sequelize');

const Item = db.Items;
const Pedido = db.Pedidos;
const Producto = db.Productos;
const Categoria = db.Categorias;

const mainProduct = path.resolve(__dirname, '../views/productos/productoDetail.ejs');
const carrito = path.resolve(__dirname, '../views/productos/productCart.ejs');
const error = path.resolve(__dirname, '../views/error.ejs');


const mainController = {

    index: async (req, res, next) => {

        try {
     
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

            const vendidos = await sequelize.query("SELECT Productos.*, count(items.idProd) AS total, Categorias.nombre as categoria FROM categorias, productos AS Productos INNER JOIN items ON items.idProd = productos.id WHERE Productos.estado = 1 AND Categorias.id = Productos.idCat GROUP BY idProd ORDER BY total DESC LIMIT 3", {type: QueryTypes.SELECT})            

            res.render("home", {ultimosProductos: ultimos, masVendidos: vendidos});

        } catch (error) {
            console.error(`Error al realizar la consulta: \nerror`);
        }
            
    },

    info: (req, res, next) => {
        res.render("nosotros", {});
    },

    productos:(req, res, next) => {
        res.render(mainProduct , {});
    },
    
    carrito: async (req, res, next) => {
        try{
            if(req.params.idpedido){

                /* Entra */
                const idPedido = req.params.idpedido

                const nroPedido = await Pedido.findOne({
                    where: {
                        id: idPedido
                    }
                });

                if(nroPedido){

                    const productosCarrito = await sequelize.query(`SELECT pedidos.id AS NroPedido, items.cantidad, categorias.nombre AS categoria, productos.nombre, productos.sabor, productos.precio FROM items, pedidos, productos, categorias WHERE pedidos.id = ${idPedido} AND productos.id = items.idProd AND pedidos.id = items.idPedido AND categorias.id = productos.idCat`, {type: QueryTypes.SELECT}) 

                    res.render(carrito , {pedido: productosCarrito});
                } else {
                    console.log(`NO se encontró el pedido\n\n`);
                }
                

            } else {

                const nroPedido = await Pedido.findAll({
                    where: {
                        estado: 1,
                    },
                    limit: 1
                });

                res.render(carrito , {pedido: nroPedido});
            }
        }catch(error){
            console.error(`Error al realizar la consulta: \n${error}`);
        }
    },

    error:(req, res, next) => {
        res.render(error , {});
    },   
};

module.exports = mainController;



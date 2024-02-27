const path = require('path');

const db = require('../database/models');
const Usuario = db.Usuarios;
const Pedido = db.Pedidos;
const Item = db.Items;
const Producto = db.Productos;
const Categoria = db.Categorias;

/* ejs */
const carrito = path.resolve(__dirname, '../views/productos/productCart.ejs');


const carritoController = {
    index: (req, res, next) => {
        res.render('productCart', {});
    },

    show: (req, res, next) => {
        res.render('', {})
    },

    carrito: async (req, res, next) => {

        const pedidoActual = await Pedido.findOne({
            where:{
                id: req.params.id
            }
        })

        const allItems = await Item.findAll({
            where:{
                idPedido: req.params.id
            }
        })

        var itemsCantidad;
        var productos;

        allItems.forEach(item => {
            itemsCantidad = Producto.findOne({
                where:{
                    id: item.idProd
                }
            })
            productos += {item, itemsCantidad}
        })

        res.render(carrito, {productos: productos})
    }
}

module.exports = carritoController;
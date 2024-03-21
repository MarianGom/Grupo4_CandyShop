const db = require('../../database/models');
const Producto = db.Productos;
const Categoria = db.Categorias;
const Info = db.Infos;

const productosAPIController = {
    allProducts: async (req, res) => {
        try{
            const productos = await Producto.findAll()

            let consulta = {
                status: 200,
                total: productos.length,
                url: 'api/productos'
            }

            return res.json({
                meta: consulta,
                data: productos
            })

        } catch(error) {
            return res.send(error)
        }
    },

    details: async (req, res) => {

        let productId = req.params.id;

        try{

            let producto = await Producto.findOne({
                where: {
                    id: productId,
                },
                });

            let consulta = {
                status: 200,
                total: producto.length,
                url: 'api/productos/:id'
            };

            return res.json({
                meta: consulta,
                data: producto.dataValues
            });
    
        } catch(error) {
                return res.send(error)
        }
    },
}

module.exports = productosAPIController;
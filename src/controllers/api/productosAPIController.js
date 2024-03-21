const db = require('../../database/models');
const Producto = db.Productos;
const Categoria = db.Categorias;
const Info = db.Infos;

const productosAPIController = {
    allProducts: (req, res) => {
        Producto.findAll()
        then(productos => {
            let consulta = {
                meta:{
                    status: 200,
                    total: productos.length,
                    url: 'api/productos'
                }
            }
            res.json(consulta)
        })
        .catch(error => console.log(error))
    },

}

module.exports = productosAPIController;
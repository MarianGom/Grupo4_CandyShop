
/* Models */
const db = require('../../database/models');
const sequelize = db.sequelize;

const Producto = db.Productos;
const Categoria = db.Categorias;
const Info = db.Infos;

const productosAPIController = {
    allProducts: async (req, res) => {
        try{

            const productos = await Producto.findAll({
                attributes: ['id', 'nombre']
            })

            /* const countxCat = await sequelize.query("SELECT Categorias.nombre as categoria, COUNT(Productos.idCat) AS cantidad FROM Categorias INNER JOIN Productos ON Categorias.id = Productos.idCat GROUP BY Categorias.id;", {type: QueryTypes.SELECT}) */

            console.log(countxCat)

            let consulta = {
                status: 200,
                /* total: productos.length, */
                url: 'api/productos'
            }

            let total = {
                total: productos.length
            }

            return res.json({
                meta: consulta,
                count: total,
                /* countByCategory: prodXCat, */
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
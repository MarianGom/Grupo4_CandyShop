const {readFileSync, writeFileSync, readFile } = require('fs')
const { join } = require('path')

const model = {
    file: join(__dirname, '../data', 'productsDataBase.json'),
    //leemos el archivo
    findAll: () => JSON.parse(readFileSync(model.file, {encoding : 'utf-8'})),

    //buscar producto por id
    findOne: id => model.findAll().find(producto => producto.idProd == id), 

    create: (product) => {
       const allProducts = model.findAll()

       product.idProd = Date.now()

       allProducts.push(product)

       writeFileSync(model.file, JSON.stringify(allProducts, null, 2))
    }
 
}

module.exports = model
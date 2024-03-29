'use strict';
const { faker } = require("@faker-js/faker");

module.exports = {
    async up (queryInterface, Sequelize) {
        const productos = [];
            Array(50)
                .fill(0)
                .forEach((_, i) => {        
                    const randomProduct = {
                        id: i + 1,
                        nombre: faker.commerce.product(),
                        sabor: faker.commerce.productAdjective(),         
                        descripcion: faker.commerce.productDescription(),
                        precio: faker.commerce.price(),
                        stock: faker.number.int({ min: 100, max: 5000 }),
                        estado: 1,
                        idInfo: faker.number.int({ min: 1, max: 20 }),
                        idCat: faker.number.int({ min: 1, max: 10 }), 
                    };
                    productos.push(randomProduct);
            })
        await queryInterface.bulkInsert("productos", productos);
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('productos', null, {});
        
    }
};

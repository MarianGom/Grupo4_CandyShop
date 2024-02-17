'use strict';
const { faker } = require("@faker-js/faker");

module.exports = {
    async up (queryInterface, Sequelize) {
        const items = [];
            Array(250)
                .fill(0)
                .forEach((_, i) => {        
                    const randomItem = {
                        id: i + 1,
                        cantidad: faker.number.int(1000),
                        estado: 1,
                        idProd: faker.number.int(50),
                        idPedido: faker.number.int(50),         
                    };
                    items.push(randomItem);
            })
        await queryInterface.bulkInsert("items", items);
    },

    async down (queryInterface, Sequelize) {

        await queryInterface.bulkDelete('items', null, {});
        
    }
};

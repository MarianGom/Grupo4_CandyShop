'use strict';
const { faker } = require("@faker-js/faker");

module.exports = {
    async up (queryInterface, Sequelize) {
        const pedidos = [];
            Array(50)
                .fill(0)
                .forEach((_, i) => {        
                    const randomList = {
                        id: i + 1,
                        tipoPago: "efectivo",
                        fecha: faker.date.anytime(),         
                        coordenadas: faker.location.county(),
                        estado: 1,
                        idUser: faker.number.int({ min: 1, max: 50 }),
                    };
                    pedidos.push(randomList);
            })
        await queryInterface.bulkInsert("pedidos", pedidos);
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('pedidos', null, {});
    }
};

'use strict';
const { faker } = require("@faker-js/faker");

module.exports = {
    async up(queryInterface, Sequelize) {
        const infos = [];
            Array(20)
                .fill(0)
                .forEach((_, i) => {        
                    const randomInfo = {
                        id: i + 1,
                        valorEnerg: faker.number.int(100),
                        porcion: faker.commerce.department(),
                        proteina: faker.number.int(100),
                        /* sodio: faker.number.int(100),
                        grasaTotal: faker.number.int(100),
                        grasaSaturada: faker.number.int(100),
                        grasaTrans: faker.number.int(100),
                        fibraAlim: faker.number.int(100), */
                        otros: faker.commerce.productDescription()
                    };
                    infos.push(randomInfo);
                })
        await queryInterface.bulkInsert("infos", infos);
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('infos', null, {});
    }
};

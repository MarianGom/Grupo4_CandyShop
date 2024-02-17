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
                        valorEnerg: faker.number.int(10),
                        porcion: "20 g",
                        proteina: faker.number.int(10),
                        sodio: faker.number.int(10),
                        grasaTotal: faker.number.int(10),
                        grasaSaturada: faker.number.int(10),
                        grasaTrans: faker.number.int(10),
                        fibraAlim: faker.number.int(10),
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

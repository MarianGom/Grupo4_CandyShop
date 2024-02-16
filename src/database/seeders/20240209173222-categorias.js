'use strict';
const { faker } = require("@faker-js/faker");

module.exports = {
    async up(queryInterface, Sequelize) {
        const categorias = [];
            Array(10)
                .fill(0)
                .forEach((_, i) => {        
                    const randomCat = {
                        id: i + 1,
                        nombre: faker.commerce.department()
                    };
                    categorias.push(randomCat);
                })
        await queryInterface.bulkInsert("categorias", categorias);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('categorias', null, {});
        
    }
};

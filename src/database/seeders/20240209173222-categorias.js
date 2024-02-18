'use strict';
const { faker } = require("@faker-js/faker");

module.exports = {
    async up(queryInterface, Sequelize) {
        const cate = [];
            Array(10)
                .fill(0)
                .forEach((_, i) => {        
                    const randomCat = {
                        id: i + 1,
                        nombre: faker.commerce.department()
                    };
                    cate.push(randomCat);
                })
        await queryInterface.bulkInsert("categorias", cate);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('categorias', null, {});
        
    }
};

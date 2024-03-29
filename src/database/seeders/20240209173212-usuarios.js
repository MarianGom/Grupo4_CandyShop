'use strict';
const { faker } = require("@faker-js/faker");

module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [];
        Array(50)
            .fill(0)
            .forEach((_, i) => {        
                const randomUser = {
                    id: i + 1,
                    nombre: faker.person.firstName(),
                    apellido: faker.person.lastName(),         
                    email: faker.internet.email(),
                    password: faker.person.zodiacSign(),
                    estado: 1,
                };
                users.push(randomUser);
            })
        await queryInterface.bulkInsert("usuarios", users);
    },

    async down(queryInterface, Sequelize) {
        
        await queryInterface.bulkDelete('usuarios', null, {});

    }
};
'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('usuarios', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: DataTypes.STRING,
            },
            apellido: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false
            },
        
            fotoPerfil: {
                type: DataTypes.STRING,
                defaultValue: 'profile.png'
            },
        
            telefono: {
                type: DataTypes.STRING
            },
        
            estado: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
          }
        );
    },

    async down (queryInterface, Sequelize) {
        
        await queryInterface.dropTable('usuarios');
      
    }
};

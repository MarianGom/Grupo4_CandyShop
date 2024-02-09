'use strict';
const { DataTypes } = require("sequelize");
module.exports = {
    async up (queryInterface, Sequelize) {
    
        await queryInterface.createTable('productos',{ 
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: "usuarios",
                    },
                    key: "id",
                },
                allowNull: false,
            },
            nombre:  {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcion:  {
                type: DataTypes.STRING,
                allowNull: false,
            },
            precio: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        });
      
    },
  
    async down (queryInterface, Sequelize) {   
        await queryInterface.dropTable('productos');     
    }
};
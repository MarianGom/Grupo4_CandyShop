
module.exports = (sequelize, dataTypes) => {

    let alias = 'InfoNutricional';

    let cols = {
        idNutri: {
            type: dataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
            
        valorEnerg: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
            
        porcion: {
            type: dataTypes.STRING,
            allowNull: false
        },
            
        proteina: {
            type: dataTypes.INTEGER
        },
            
        sodio: {
            type: dataTypes.INTEGER
        },
            
        grasaTotal: {
            type: dataTypes.INTEGER,
        },
            
        grasaSaturada: {
            type: dataTypes.INTEGER,
        },
            
        grasaTrans : {
            type: dataTypes.INTEGER,
        },
            
        fibraAlim: {
            type: dataTypes.INTEGER,
        },
            
        otros: {
            type: dataTypes.STRING,
        }    
    };

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const InfoNutricional = sequelize.define(alias, cols, config);

    InfoNutricional.associate = function(models) {
        InfoNutricional.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "idNutri"
        })
    }

    return InfoNutricional;
}
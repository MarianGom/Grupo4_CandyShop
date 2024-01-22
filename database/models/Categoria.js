
module.exports = (sequelize, dataTypes) => {

    let alias = 'Categoria';

    let cols = {
        idCat: {
            type: dataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true,
            allowNull: false
        },
            
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(models) {
        Categoria.hasMany(models.Producto, {
            as: "produtos",
            foreignKey: "idCat"
        })
    }

    return InfoNutricional;
}
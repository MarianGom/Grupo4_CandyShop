
module.exports = (sequelize, dataTypes) => {

    let alias = 'Categorias';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
            
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };

    let config = {
        tableName: "categorias",
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    }

    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = (models) => {
        Categoria.hasMany(models.Productos, {
            as: "Productos",
            foreignKey: "idCat"
        })
    }

    return Categoria;
}
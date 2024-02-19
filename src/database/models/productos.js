
module.exports = (sequelize, dataTypes) => {

    let alias = 'Productos';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
            
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        },
            
        sabor: {
            type: dataTypes.STRING,
            allowNull: false
        },
            
        descripcion: {
            type: dataTypes.STRING,
            allowNull: false
        },
            
        precio: {
            type: dataTypes.INTEGER,
            allowNull: false
            
        },
            
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
            
        fotoProd: {
            type: dataTypes.STRING,
            defaultValue: 'profile.png'
        },
            
        estado: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
            
    };

    let config = {
        tableName: "productos",
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    }

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models) {
        Producto.belongsTo(models.Infos, {
            as: "Infos",
            foreignKey: "idInfo"
        })

        Producto.belongsTo( models.Categorias, {
            as: "Categorias",
            foreignKey: "idCat"
        })

        Producto.hasMany(models.Items, {
            as: "Items",
            foreignKey: "idProd"
        })
    }

    return Producto;
}

module.exports = (sequelize, dataTypes) => {

    let alias = 'Producto';

    let cols = {
        idProd: {
            type: dataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true,
            allowNull: false
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
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models) {
        Producto.belogsTo(models.InfoNutricional, {
            as: "infoNutricionales",
            foreignKey: "idNutri"
        })
    }

    Producto.associate = function(models) {
        Producto.belogsTo(models.Categoria, {
            as: "categorias",
            foreignKey: "idCat"
        })
    }

    return Producto;
}
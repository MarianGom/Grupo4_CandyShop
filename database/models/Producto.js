
module.exports = (sequelize, dataTypes) => {

    let alias = 'Producto';

    let cols = {
        idProd: {
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
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    }

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models) {
        Producto.belongsTo(models.InfoNutricional, {
            as: "infoNutricionales",
            foreignKey: "idNutri"
        })

        Producto.belongsTo( models.Categoria, {
            as: "categorias",
            foreignKey: "idCat"
        })

        Producto.hasMany(models.ProdxPedido, {
            as: "prodxPedidos",
            foreignKey: "idProd"
        })
    }

    return Producto;
}

module.exports = (sequelize, dataTypes) => {

    let alias = 'Pedido';

    let cols = {
        idPedido: {
            type: DataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true,
            allowNull: false
            },
            
                tipoPago : {
            type: DataTypes.STRING,
            allowNull: false
            },
            
                fecha: {
            type: DataTypes.DATE
            },
            
                coordenadas: {
            type: DataTypes.INTEGER,
            allowNull: false
            },
            
                estado: {
            type: DataTypes.INTEGER,
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
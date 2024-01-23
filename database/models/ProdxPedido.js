
module.exports = (sequelize, dataTypes) => {

    let alias = 'ProdxPedido';

    let cols = {
        idProdxPedido:{
            type: dataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true,
            allowNull: false
        },

        idProd: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        
        idPedido: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
            
        cantidad: {
            type: dataTypes.INTEGER
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

    const ProdxPedido = sequelize.define(alias, cols, config);

    ProdxPedido.associate = function(models) {
        ProdxPedido.belogsTo(models.Pedido, {
            as: "Pedidos",
            foreignKey: "idPedido"
        })
    }

    ProdxPedido.associate = function(models) {
        ProdxPedido.belogsTo(models.Producto, {
            as: "Productos",
            foreignKey: "idProd"
        })
    }

    return ProdxPedido;
}
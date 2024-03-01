
module.exports = (sequelize, dataTypes) => {

    let alias = 'Items';

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true
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
        tableName: "items",
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    }

    const Item = sequelize.define(alias, cols, config);

    Item.associate = function(models) {
        Item.belongsTo(models.Pedidos, {
            as: "ItemsPedido",
            foreignKey: "idPedido"
        })
        
        Item.belongsTo(models.Productos, {
            as: "ItemsProductos",
            foreignKey: "idProd"
        })
    }

    return Item;
}

module.exports = (sequelize, dataTypes) => {

    let alias = 'Pedidos';

    let cols = {
        idPedido: {
            type: dataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        
        tipoPago : {
            type: dataTypes.STRING,
            allowNull: false
        },
            
        fecha: {
            type: dataTypes.DATE
        },
            
        coordenadas: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        
        estado: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        idUser: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "pedidos",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Pedido = sequelize.define(alias, cols, config);

    Pedido.associate = function(models) {
        Pedido.hasMany(models.Items, {
            as: "Items",
            foreignKey: "idPedido"
        })

        Pedido.belongsTo( models.Usuario, {
            as: "Usuarios",
            foreignKey: "idUser"
        })
    }

    return Pedido;
}
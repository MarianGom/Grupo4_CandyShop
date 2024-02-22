
module.exports = (sequelize, dataTypes) => {

    let alias = 'Usuarios';

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
    
        apellido: {
            type: dataTypes.STRING,
            allowNull: false
        },
    
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
    
        password: {
            type: dataTypes.TEXT,
            allowNull: false
        },
    
        fotoPerfil: {
            type: dataTypes.STRING,
            defaultValue: 'profile.png'
        },
    
        telefono: {
            type: dataTypes.STRING
        },
    
        estado: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
    
        isAdmin: {
            type: dataTypes.BOOLEAN,
            allowNull: false, 
            default: false
        }
    };

    let config = {
        tableName: "usuarios",
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    }

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(models) {
        Usuario.hasMany(models.Pedidos, {
            as: "Pedidos",
            foreignKey: "idUser"
        })
    }

    return Usuario;
}
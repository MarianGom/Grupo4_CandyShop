
module.exports = (sequelize, dataTypes) => {

    let alias = 'Usuario';

    let cols = {
        idUser: {
            type: dataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true,
            allowNull: false
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
            type: dataTypes.STRING,
            allowNull: true
        },
    
        estado: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    
        isAdmin: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        }
    };

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Usuario = sequelize.define(alias, cols, config);

    return Usuario;
}
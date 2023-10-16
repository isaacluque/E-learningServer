const { DataTypes } = require('sequelize');
const { connec } = require('../../../database/database');

const ViewUsers = connec.define('view_user',{
    ID_USUARIO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    USUARIO: {
        type: DataTypes.STRING
    },
    NOMBRE_USUARIO: {
        type: DataTypes.STRING
    },
    ESTADO: {
        type: DataTypes.STRING,
        // default: true
    },
    CONTRASEÑA: {
        type: DataTypes.STRING
    },
    ID_ROL: {
        type: DataTypes.INTEGER
    },
    ROL: {
        type: DataTypes.STRING
    },
    ULTIMA_CONEXION: {
        type: DataTypes.DATE
    },
    CORREO_ELECTRONICO: {
        type: DataTypes.STRING
    },
    // IMAGEN: {
    //     type: DataTypes.STRING
    // },
    CREADO_POR: {
        type: DataTypes.STRING
    },
    FECHA_CREACION: {
        type: DataTypes.DATE
    },
    MODIFICADO_POR: {
        type: DataTypes.DATE
    },
    FECHA_MODIFICACION: {
        type: DataTypes.DATE
    },
}, {
    tableName: 'view_user',
    timestamps: false,
});

module.exports = ViewUsers;
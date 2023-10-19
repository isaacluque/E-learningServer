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
        default: true
    },
    CONTRASENA: {
        type: DataTypes.TEXT
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
    CREADO_POR: {
        type: DataTypes.STRING
    },
    FECHA_CREACION: {
        type: DataTypes.DATE
    },
    MODIFICADO_POR: {
        type: DataTypes.STRING
    },
    FECHA_MODIFICACION: {
        type: DataTypes.DATE
    },
    IMAGEN: {
        type: DataTypes.BLOB
    },
    MIMETYPE: {
        type: DataTypes.TEXT
    },
}, {
    tableName: 'view_user',
    timestamps: false,
});

module.exports = ViewUsers;
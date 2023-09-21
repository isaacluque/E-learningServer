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
    CONTRASEÑA: {
        type: DataTypes.STRING
    },
    ROL: {
        type: DataTypes.INTEGER
    },
    ULTIMA_CONEXION: {
        type: DataTypes.DATE
    },
    CORREO_ELECTRONICO: {
        type: DataTypes.STRING
    },
    IMAGEN: {
        type: DataTypes.STRING
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    FECHA_CREACION: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    },
    FECHA_MODIFICACION: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'view_user',
    timestamps: false,
});

module.exports = ViewUsers;
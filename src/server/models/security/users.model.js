const { DataTypes } = require('sequelize');
const { connec } = require('../../database/database');

const Users = connec.define('tbl_ms_usuario',{
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
    ESTADO_USUARIO: {
        type: DataTypes.STRING,
        default: true
    },
    CONTRASENA: {
        type: DataTypes.STRING
    },
    ID_ROL: {
        type: DataTypes.INTEGER
    },
    FECHA_ULTIMA_CONEXION: {
        type: DataTypes.DATE
    },
    PRIMER_INGRESO: {
        type: DataTypes.INTEGER
    },
    CORREO_ELECTRONICO: {
        type: DataTypes.STRING
    },
    INTENTOS: {
        type: DataTypes.INTEGER
    },
    AUTOREGISTRADO: {
        type: DataTypes.BOOLEAN
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'tbl_ms_usuario',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_MODIFICACION'
});

module.exports = Users;
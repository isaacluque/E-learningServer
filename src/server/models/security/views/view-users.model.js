const { DataTypes } = require('sequelize')

const { connec } = require('../../../database/database');


const ViewUsers = connec.define(`view_users`, {
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
        type: DataTypes.STRING
    },
    ID_ROL: {
        type: DataTypes.INTEGER
    },
    ROL: {
        type: DataTypes.STRING
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
    INTENTOS:{
        type: DataTypes.INTEGER
    },
    IMAGEN: {
        type: DataTypes.STRING
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    USUARIO_CREADOR: {
        type: DataTypes.STRING
    },
    FECHA_CREACION: {
        type: DataTypes.DATE
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    },
    USUARIO_MODIFICADOR: {
        type: DataTypes.STRING
    },
    FECHA_MODIFICACION: {
        type: DataTypes.DATE
    },
}, {
    tableName: 'view_users',
    timestamps: false,
})

//Para exportar el modelo
module.exports = ViewUsers;
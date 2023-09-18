const { DataTypes } = require('sequelize')

const { connec } = require('../../../database/database');


const ViewDetailsPYMEStudent = connec.define(`view_details_pyme_student`, {
    ID_ESTUDIANTE: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    TIPO_ESTUDIANTE: {
        type: DataTypes.STRING
    },
    FECHA_CREACION: {
        type: DataTypes.DATE
    },
    ID_MODIFICADO_POR_ESTUDIANTE: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR_ESTUDIANTE: {
        type: DataTypes.STRING
    },
    FECHA_MODIFICACION: {
        type: DataTypes.DATE
    },
    ROL: {
        type: DataTypes.STRING
    },
    NOMBRE_DE_LA_EMPRESA: {
        type: DataTypes.STRING
    },
    CORREO_ELECTRONICO: {
        type: DataTypes.STRING
    },
    CONTRASENA: {
        type: DataTypes.STRING
    },
    CODIGO_LLAMADA: {
        type: DataTypes.STRING
    },
    TELEFONO: {
        type: DataTypes.STRING
    },
    TAMANO_EMPRESA: {
        type: DataTypes.STRING
    },
    UBICACION: {
        type: DataTypes.STRING
    },
    ESTADO: {
        type: DataTypes.STRING,
        default: true
    },
    IMAGEN: {
        type: DataTypes.STRING
    },
    INTENTOS:{
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'view_details_pyme_student',
    timestamps: false,
})

//Para exportar el modelo
module.exports = ViewDetailsPYMEStudent;
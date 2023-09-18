const { DataTypes } = require('sequelize')

const { connec } = require('../../../database/database');


const ViewDetailsNormalStudent = connec.define(`view_details_normal_student`, {
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
    NOMBRE_ESTUDIANTE: {
        type: DataTypes.STRING
    },
    CORREO_ELECTRONICO: {
        type: DataTypes.STRING
    },
    CONTRASENA: {
        type: DataTypes.STRING
    },
    NOMBRE: {
        type: DataTypes.STRING
    },
    APELLIDO: {
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
    tableName: 'view_details_normal_student',
    timestamps: false,
})

//Para exportar el modelo
module.exports = ViewDetailsNormalStudent;
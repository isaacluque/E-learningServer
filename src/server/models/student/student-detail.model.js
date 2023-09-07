const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const StudenDetails = connec.define(`tbl_mest_detalle_estudiante`, {
    ID_DETALLE_ESTUDIANTE: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_ESTUDIANTE: {
        type: DataTypes.INTEGER
    },
    NOMBRE_USUARIO: {
        type: DataTypes.STRING
    },
    NOMBRE: {
        type: DataTypes.STRING
    },
    APELLIDO: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'tbl_mest_detalle_estudiante',
    timestamps: false
})

//Para exportar el modelo
module.exports = StudenDetails;
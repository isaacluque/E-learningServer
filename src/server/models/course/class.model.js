const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Classes = connec.define(`tbl_mcur_clase`, {
    ID_CLASE: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_SECCION: {
        type: DataTypes.INTEGER
    },
    TITULO: {
        type: DataTypes.STRING
    },
    FINALIZADO: {
        type: DataTypes.BOOLEAN
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    CREADO_POR_INSTRUCTOR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR_INSTRUCTOR: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'tbl_mcur_clase',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_MODIFICACION'
})

//Para exportar el modelo
module.exports = Classes;
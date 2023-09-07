const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Sections = connec.define(`tbl_mcur_seccion`, {
    ID_SECCION: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_CURSO: {
        type: DataTypes.INTEGER
    },
    TITULO: {
        type: DataTypes.STRING
    },
    DURACION: {
        type: DataTypes.TIME
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
    tableName: 'tbl_mcur_seccion',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_MODIFICACION'
})

//Para exportar el modelo
module.exports = Sections;
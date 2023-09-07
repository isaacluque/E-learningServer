const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Courses = connec.define(`tbl_mcur_curso`, {
    ID_CURSO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    TITULO: {
        type: DataTypes.STRING
    },
    DESCRIPCION: {
        type: DataTypes.TEXT
    },
    PRECIO: {
        type: DataTypes.DECIMAL
    },
    ID_INSTRUCTOR: {
        type: DataTypes.INTEGER
    },
    ID_CATEGORIA: {
        type: DataTypes.INTEGER
    },
    ID_IDIOMA: {
        type: DataTypes.INTEGER
    },
    REQUERIMIENTOS: {
        type: DataTypes.TEXT
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
    tableName: 'tbl_mcur_curso',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_MODIFICACION'
})

//Para exportar el modelo
module.exports = Courses;
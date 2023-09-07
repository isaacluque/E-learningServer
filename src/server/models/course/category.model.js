const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Categories = connec.define(`tbl_mcur_categoria`, {
    ID_CATEGORIA: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    CATEGORIA: {
        type: DataTypes.STRING
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'tbl_mcur_categoria',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_MODIFICACION'
})

//Para exportar el modelo
module.exports = Categories;
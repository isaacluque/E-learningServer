const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const DescountType = connec.define(`tbl_mcur_tipo_descuento`, {
    ID_TIPO_DESCUENTO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    DETALLE: {
        type: DataTypes.STRING
    },
    CANTIDAD: {
        type: DataTypes.DECIMAL
    },
    ESTADO: {
        type: DataTypes.BOOLEAN
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'tbl_mcur_tipo_descuento',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_MODIFICACION'
})

//Para exportar el modelo
module.exports = DescountType;
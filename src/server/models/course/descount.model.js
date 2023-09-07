const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Descounts = connec.define(`tbl_mcur_descuento`, {
    ID_DESCUENTO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    NOMBRE: {
        type: DataTypes.STRING
    },
    FECHA_INICIO: {
        type: DataTypes.DATE
    },
    FECHA_FINALIZACION: {
        type: DataTypes.DATE
    },
    ID_TIPO_DESCUENTO: {
        type: DataTypes.INTEGER
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'tbl_mcur_descuento',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_MODIFICACION'
})

//Para exportar el modelo
module.exports = Descounts;
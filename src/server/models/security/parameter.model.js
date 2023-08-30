const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Parameter = connec.define(`tbl_ms_parametro`, {
    ID_PARAMETRO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    PARAMETRO: {
        type: DataTypes.STRING
    },
    VALOR: {
        type: DataTypes.STRING
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'tbl_ms_parametro',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_MODIFICACION'
})

//Para exportar el modelo
module.exports = Parameter;
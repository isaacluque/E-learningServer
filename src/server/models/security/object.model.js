const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Objects = connec.define(`tbl_ms_objeto`, {
    ID_OBJETO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    OBJETO: {
        type: DataTypes.STRING
    },
    DESCRIPCION: {
        type: DataTypes.STRING
    },
    TIPO_OBJETO: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'tbl_ms_objeto',
    timestamps: false
})

//Para exportar el modelo
module.exports = Objects;
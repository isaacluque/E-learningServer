const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Binnacles = connec.define(`tbl_ms_bitacora`, {
    ID_BITACORA: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    FECHA: {
        type: DataTypes.DATE
    },
    ID_USUARIO: {
        type: DataTypes.INTEGER
    },
    ID_OBJETO: {
        type: DataTypes.INTEGER
    },
    ID_INSTRUCTOR: {
        type: DataTypes.INTEGER
    },
    ACCION: {
        type: DataTypes.STRING
    },
    DESCRIPCION: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'tbl_ms_bitacora',
    timestamps: false
})

//Para exportar el modelo
module.exports = Binnacles;
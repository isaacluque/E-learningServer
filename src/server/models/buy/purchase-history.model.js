const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const ShoppingHistory = connec.define(`tbl_mc_hist_compra`, {
    ID_HIST_COMPRA: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_ESTUDIANTE: {
        type: DataTypes.INTEGER
    },
    ID_COMPRA: {
        type: DataTypes.INTEGER
    },
    ESTADO: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'tbl_mc_hist_compra',
    timestamps: false
})

//Para exportar el modelo
module.exports = ShoppingHistory;
const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const ShoppingCarts = connec.define(`tbl_mc_carrito`, {
    ID_CARRITO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_ESTUDIANTE: {
        type: DataTypes.INTEGER
    },
    ID_CURSO: {
        type: DataTypes.INTEGER
    },
    PRECIO_TOTAL: {
        type: DataTypes.DECIMAL
    },
}, {
    tableName: 'tbl_mc_carrito',
    timestamps: false
})

//Para exportar el modelo
module.exports = ShoppingCarts;
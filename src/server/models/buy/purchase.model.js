const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Purchases = connec.define(`tbl_mc_compra`, {
    ID_COMPRA: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_USUARIO: {
        type: DataTypes.INTEGER
    },
    ID_CURSO: {
        type: DataTypes.INTEGER
    },
    ID_METODO_PAGO: {
        type: DataTypes.INTEGER
    },
    ID_CARRITO: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'tbl_mc_compra',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
})

//Para exportar el modelo
module.exports = Purchases;
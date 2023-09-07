const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const PaymentMethod = connec.define(`tbl_mc_metodo_pago`, {
    ID_METODO_PAGO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    METODO_PAGO: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'tbl_mc_metodo_pago',
    timestamps: false
})

//Para exportar el modelo
module.exports = PaymentMethod;
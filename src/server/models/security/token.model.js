const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Token = connec.define(`tbl_ms_token`, {
    TOKEN: {
        type: DataTypes.STRING,
        primaryKey: true
    }
}, {
    tableName: 'tbl_ms_token',
    timestamps: false
})

//Para exportar el modelo
module.exports = Token;
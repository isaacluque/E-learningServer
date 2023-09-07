const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Languages = connec.define(`tbl_mcur_idioma`, {
    ID_IDIOMA: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    IDIOMA: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'tbl_mcur_idioma',
    timestamps: false
})

//Para exportar el modelo
module.exports = Languages;
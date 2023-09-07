const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Location = connec.define(`tbl_mest_ubicacion`, {
    ID_UBICACION: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    UBICACION: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'tbl_mest_ubicacion',
    timestamps: false
})

//Para exportar el modelo
module.exports = Location;
const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Location = connec.define(`tbl_mest_ubicacion`, {
    ID_UBICACION: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ISO2: {
        type: DataTypes.STRING
    },
    NOMBRE_CORTO: {
        type: DataTypes.STRING
    },
    NOMBRE_LARGO: {
        type: DataTypes.STRING
    },
    ISO3: {
        type: DataTypes.STRING
    },
    NUMCODE: {
        type: DataTypes.STRING
    },
    CODIGO_LLAMADA: {
        type: DataTypes.STRING
    },
    CCTID: {
        type: DataTypes.STRING
    },
    UN_MEMBER: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'tbl_mest_ubicacion',
    timestamps: false
})

//Para exportar el modelo
module.exports = Location;
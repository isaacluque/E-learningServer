const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Ratings = connec.define(`tbl_mcur_valoracion`, {
    ID_VALORACION: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_ESTUDIANTE: {
        type: DataTypes.INTEGER
    },
    ID_CURSO: {
        type: DataTypes.INTEGER
    },
    VALORACION: {
        type: DataTypes.DECIMAL
    },
}, {
    tableName: 'tbl_mcur_valoracion',
    timestamps: false
})

//Para exportar el modelo
module.exports = Ratings;
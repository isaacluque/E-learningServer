const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Inscriptions = connec.define(`tbl_mcur_inscripcion`, {
    ID_INSCRIPCION: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_ESTUDIANTE: {
        type: DataTypes.INTEGER
    },
    ID_CURSO: {
        type: DataTypes.INTEGER
    },
    INSCRITO: {
        type: DataTypes.BOOLEAN
    },
}, {
    tableName: 'tbl_mcur_inscripcion',
    timestamps: false
})

//Para exportar el modelo
module.exports = Inscriptions;
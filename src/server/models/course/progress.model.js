const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Progresses = connec.define(`tbl_mcur_progreso`, {
    ID_PROGRESO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_USUARIO: {
        type: DataTypes.INTEGER
    },
    ID_SECCION: {
        type: DataTypes.INTEGER
    },
    COMPLETADA: {
        type: DataTypes.BOOLEAN
    },
}, {
    tableName: 'tbl_mcur_progreso',
    timestamps: false
})

//Para exportar el modelo
module.exports = Progresses;
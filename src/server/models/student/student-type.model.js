const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const StudentType = connec.define(`tbl_mest_tipo_estudiante`, {
    ID_TIPO_ESTUDIANTE: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    TIPO_ESTUDIANTE: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'tbl_mest_tipo_estudiante',
    timestamps: false
})

//Para exportar el modelo
module.exports = StudentType;
const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Multimedia = connec.define(`tbl_mcur_multimedia`, {
    ID_MULTIMEDIA: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_CLASE: {
        type: DataTypes.INTEGER
    },
    TIPO_MULTIMEDIA: {
        type: DataTypes.STRING
    },
    URL: {
        type: DataTypes.TEXT
    },
    DURACION: {
        type: DataTypes.TIME
    },
}, {
    tableName: 'tbl_mcur_multimedia',
    timestamps: false
})

//Para exportar el modelo
module.exports = Multimedia;
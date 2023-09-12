const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const PYMEDetails = connec.define(`tbl_mest_detalle_pyme`, {
    ID_DETALLE_PYME: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_ESTUDIANTE: {
        type: DataTypes.INTEGER
    },
    TELEFONO: {
        type: DataTypes.STRING
    },
    NOMBRE_EMPRESA: {
        type: DataTypes.STRING
    },
    ID_TAMANO_EMPRESA: {
        type: DataTypes.INTEGER
    },
    ID_UBICACION: {
        type: DataTypes.INTEGER
    },
    NOMBRE_USUARIO: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'tbl_mest_detalle_pyme',
    timestamps: false
})

//Para exportar el modelo
module.exports = PYMEDetails;
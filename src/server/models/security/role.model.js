const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Roles = connec.define(`tbl_ms_rol`, {
    ID_ROL: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ROL: {
        type: DataTypes.STRING
    },
    DESCRIPCION: {
        type: DataTypes.STRING
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    },
    ESTADO: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'tbl_ms_rol',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_MODIFICACION'
})

//Para exportar el modelo
module.exports = Roles;
const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Permissions = connec.define(`tbl_ms_permiso`, {
    ID_PERMISO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_ROL: {
        type: DataTypes.INTEGER
    },
    ID_OBJETO: {
        type: DataTypes.INTEGER
    },
    PERMISO_INSERTAR: {
        type: DataTypes.BOOLEAN
    },
    PERMISO_ACTUALIZAR: {
        type: DataTypes.BOOLEAN
    },
    PERMISO_ELIMINAR: {
        type: DataTypes.BOOLEAN
    },
    PERMISO_CONSULTAR: {
        type: DataTypes.BOOLEAN
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'tbl_ms_permiso',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_MODIFICACION'
})

//Para exportar el modelo
module.exports = Permissions;
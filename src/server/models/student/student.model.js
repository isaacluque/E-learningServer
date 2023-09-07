const { DataTypes } = require('sequelize');
const { connec } = require('../../database/database');

const Students = connec.define('tbl_mest_estudiante',{
    ID_ESTUDIANTE: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_TIPO_ESTUDIANTE: {
        type: DataTypes.INTEGER
    },
    CREADO_POR_USUARIO: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR_ESTUDIANTE: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR_USUARIO: {
        type: DataTypes.INTEGER
    },
    ID_ROL: {
        type: DataTypes.INTEGER
    },
    CORREO_ELECTRONICO: {
        type: DataTypes.STRING
    },
    CONTRASENA: {
        type: DataTypes.STRING
    },
    ESTADO: {
        type: DataTypes.STRING
    },
    IMAGEN: {
        type: DataTypes.STRING
    },
    INTENTOS: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'tbl_mest_estudiante',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_MODIFICACION'
});

module.exports = Students;
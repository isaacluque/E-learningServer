const { DataTypes } = require('sequelize');
const { connec } = require('../../database/database');

const Instructors = connec.define('tbl_mins_instructor',{
    ID_INSTRUCTOR: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    NOMBRE: {
        type: DataTypes.STRING
    },
    CORREO_ELECTRONICO: {
        type: DataTypes.STRING
    },
    CONTRASENA: {
        type: DataTypes.TEXT
    },
    INTRODUCCION: {
        type: DataTypes.TEXT
    },
    ID_ESTUDIANTE: {
        type: DataTypes.INTEGER
    },
    EXP_LABORAL: {
        type: DataTypes.TEXT
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR_INSTRUCTOR: {
        type: DataTypes.INTEGER
    },
    ID_ROL: {
        type: DataTypes.INTEGER
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
    tableName: 'tbl_mins_instructor',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_MODIFICACION'
});

module.exports = Instructors;
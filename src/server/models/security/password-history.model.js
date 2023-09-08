const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const PasswordHistory = connec.define(`tbl_ms_hist_contrasena`, {
    ID_HIST: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    ID_USUARIO: {
        type: DataTypes.INTEGER,
    },
    ID_INSTRUCTOR: {
        type: DataTypes.INTEGER,
    },
    ID_ESTUDIANTE: {
        type: DataTypes.INTEGER,
    },
    CONTRASENA: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'tbl_ms_hist_contrasena',
    timestamps: false,
})

module.exports = PasswordHistory;
const { DataTypes } = require('sequelize');
const { connec } = require('../../database/database');

const Imagens = connec.define('tbl_ms_imagenes',{
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    NOMBRE: {
        type: DataTypes.TEXT
    },
    RUTA: {
        type: DataTypes.BLOB('long')
    },
    ID_USUARIO: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'tbl_ms_imagenes',
    timestamps: false,
});

module.exports = Imagens;
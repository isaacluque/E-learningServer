const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const CompanySize = connec.define(`tbl_mest_tamano_empresa`, {
    ID_TAMANO_EMPRESA: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    TAMANO_EMPRESA: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'tbl_mest_tamano_empresa',
    timestamps: false
})

//Para exportar el modelo
module.exports = CompanySize;
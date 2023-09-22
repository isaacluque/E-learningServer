const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const TypeSocialNetwork = connec.define(`tbl_mins_tipo_red_social`, {
    ID_TIPO_RED_SOCIAL: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    URL: {
        type: DataTypes.TEXT
    },
    RED_SOCIAL: {
        type: DataTypes.TEXT
    },
}, {
    tableName: 'tbl_mins_tipo_red_social',
    timestamps: false
})

//Para exportar el modelo
module.exports = TypeSocialNetwork;
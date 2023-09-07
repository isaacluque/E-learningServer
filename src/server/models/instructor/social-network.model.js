const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const SocialNetwork = connec.define(`tbl_mins_red_social`, {
    ID_RED_SOCIAL: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_TIPO_RED_SOCIAL: {
        type: DataTypes.INTEGER
    },
    ID_INSTRUCTOR: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'tbl_mins_red_social',
    timestamps: false
})

//Para exportar el modelo
module.exports = SocialNetwork;
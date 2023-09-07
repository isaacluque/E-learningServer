const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const DiscountCourse = connec.define(`tbl_mcur_curso_descuento`, {
    ID_CURSO_DESCUENTO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_CURSO: {
        type: DataTypes.INTEGER
    },
    ID_DESCUENTO: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'tbl_mcur_curso_descuento',
    timestamps: false
})

//Para exportar el modelo
module.exports = DiscountCourse;
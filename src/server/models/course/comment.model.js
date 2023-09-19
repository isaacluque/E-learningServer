const { DataTypes } = require('sequelize')

const { connec } = require('../../database/database');


const Comments = connec.define(`tbl_mcur_comentario`, {
    ID_COMENTARIO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_CURSO: {
        type: DataTypes.INTEGER
    },
    ID_USUARIO: {
        type: DataTypes.INTEGER
    },
    CONTENIDO: {
        type: DataTypes.TEXT
    },
    IMAGEN: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'tbl_mcur_comentario',
    timestamps: true,
    createdAt: 'FECHA_HORA'
})

//Para exportar el modelo
module.exports = Comments;
const { request, response } = require("express");
const Students = require("../models/student/student.model");

const existStudentNormal = async( req = request, res = response, next ) => {

    const { email = "" } = req.body;

    // verify user
    let studenNormalRegister = await Students.findOne({ where: { CORREO_ELECTRONICO: email,  ID_TIPO_ESTUDIANTE: 1} });

    if ( studenNormalRegister ) {
        return res.status(400).json({
            ok: false,
            msg: 'This student will already be registered.'
        })
    }

    next()
}

const existStudentPYME = async( req = request, res = response, next ) => {

    const { email = "" } = req.body;

    // verify user
    let studentPYMERegister = await Students.findOne({ where: { CORREO_ELECTRONICO: email,  ID_TIPO_ESTUDIANTE: 2} });

    if ( studentPYMERegister ) {
        return res.status(400).json({
            ok: false,
            msg: 'This PYME student will already be registered.'
        })
    }

    next()
}

module.exports = {
    existStudentNormal,
    existStudentPYME,
}
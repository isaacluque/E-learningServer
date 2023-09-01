const { response, request } = require("express");
const Parameter = require("../models/security/parameter.model");

const validatePasswordLength = async(req = request, res = response, next) => {

    const max = await Parameter.findOne({where: {PARAMETRO: 'MAX_CONTRASENA'}})
    const min = await Parameter.findOne({where: {PARAMETRO: 'MIN_CONTRASENA'}})

    // data del body 
    let { password = "" } = req.body;

    if(!password) {
        password = ""
    }

    if ( max.VALOR < password.length ) {
        return res.status(400).json({
            ok: false,
            msg: `Número de carácteres máximos en la contraseña: ${max.VALOR}`
        })
    }

    if ( min.VALOR > password.length ) {
        return res.status(400).json({
            ok: false,
            msg: `Número de carácteres mínimo en la contraseña: ${min.VALOR}`
        })
    }

    //TODO OK!
    next();

}

module.exports = {
    validatePasswordLength
}
const { response, request } = require("express");

const Users = require("../models/security/users.model");
const { Op } = require("sequelize");

const existEmail = async( req = request, res = response, next ) => {

    const { email } = req.body;

    // verify email
    let user = await Users.findOne({ where: { CORREO_ELECTRONICO: email } });
    if ( user ) {

        return res.status(400).json({
            ok: false,
            msg: 'This email is already registered'
        })
    }

    next()
}

const existUser = async( req = request, res = response, next ) => {

    const { name = "" } = req.body;

    // verify user
    let userRegister = await Users.findOne({ where: { USUARIO: name } });

    if ( userRegister ) {
        return res.status(400).json({
            ok: false,
            msg: 'This user is already registered'
        })
    }

    next()
}

const existUserUpdated = async( req = request, res = response, next ) => {

    const { id_user } = req.params;
    const { user = "" } = req.body;

    // Verificar el usuario
    let users = await Users.findOne({
        where: {    //Where ROL = rol and NOT ID_ROL = id_rol
            USUARIO: user,
            [Op.not] : [
                {ID_USUARIO: id_user}
            ]       
        }
    });

    if ( users ) {
        return res.status(400).json({
            ok: false,
            msg: 'This user is already registered'
        })
    }

    next()
}

const validateUserSpaces = ( req = request, res = response, next ) => {

    const { first_name = "", last_name = "" } = req.body;

    if ( first_name.includes('  ') || last_name.includes('  ')) {
        return res.status(400).json({
            ok: false,
            msg: 'No more than 1 white space is allowed between words in the name.'
        })
    }

    next()
}

module.exports = {
    existEmail,
    existUser,
    validateUserSpaces,
    existUserUpdated,
}
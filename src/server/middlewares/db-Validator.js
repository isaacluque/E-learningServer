const { Op } = require("sequelize");
const Users = require("../models/security/users.model");

const emailExisting = async(email = '') => {
    const emailExists = await Users.findOne({where:{CORREO_ELECTRONICO: email}});
    if (emailExists){
        throw new Error(`The email: ${email}, is already registered`)
    }
};

const emailExistingUpdate = async(req = request, res = response, next) => {

    const { id_user } = req.params;
    const { email = "" } = req.body;

    const emailExist = await Users.findOne({
        where: {    //Where ROL = rol and NOT ID_ROL = id_rol
            CORREO_ELECTRONICO: email,
            [Op.not] : [
                {ID_USUARIO: id_user}
            ]       
        }
    });

    // Validar que no exista otro rol con el mismo nombre
    if ( emailExist ) {
        return res.status(400).json({
            ok: false,
            msg: `The email: ${email} is already registered`
        })
    }

    //TODO OK!
    next();

}


module.exports = {
    emailExisting,
    emailExistingUpdate,
}
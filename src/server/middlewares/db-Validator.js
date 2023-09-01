const Users = require("../models/security/users.model");

const emailExisting = async(email = '') => {
    const emailExists = await Users.findOne({where:{CORREO_ELECTRONICO: email}});
    if (emailExists){
        throw new Error(`The email: ${email}, is already registered`)
    }
};

module.exports = {
    emailExisting,
}
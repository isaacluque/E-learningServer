const Users = require("../models/security/users.model");
const Students = require("../models/student/student.model");

const emailExisting = async(email = '') => {
    const emailExists = await Users.findOne({where:{CORREO_ELECTRONICO: email}});
    if (emailExists){
        throw new Error(`The email: ${email}, is already registered`)
    }
};

const emailStudentExisting = async(email = '') => {
    const emailExists = await Students.findOne({where:{CORREO_ELECTRONICO: email}});
    if (emailExists){
        throw new Error(`The email: ${email}, is already registered`)
    }
};

module.exports = {
    emailExisting,
    emailStudentExisting
}
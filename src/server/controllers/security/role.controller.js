const { request, response } = require("express");
const Roles = require("../../models/security/role.model");


const getRoles = async (req = request, res = response) => {
    try {
        const role = await Roles.findAll();

        res.status(200).json({
            ok: true,
            Role: role
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: error
        })
    }
}

module.exports = {
    getRoles
}
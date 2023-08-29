const { request, response } = require("express");

const bcrypt = require('bcryptjs');
const Roles = require("../models/security/rol.model");
const Users = require("../models/security/users.model");
const PasswordHistory = require("../models/security/password-history.model");

const register = async(req = request, res = response ) => {
    //Extract body parameters
    const {name = "", username = "", email = "", password = "", confir_password = "", terms_and_policies = 0} = req.body;
    try {
        //Validate that both passwords match
        if(password !== confir_password){
            return res.status(400).json({
                ok: false,
                msg: 'Passwords do not match.'
            });
        };

        //Validate that you accept the terms and policies
        // if(!terms_and_policies){
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'You must accept the terms and policies'
        //     });
        // };

        //Get the default role
        const idRol = await Roles.findOne({where:{ROL: 'STUDENT'}});

        //Build the user in the model
        DBUser = await Users.build({
            USUARIO: name,
            NOMBRE_USUARIO: username,
            CORREO_ELECTRONICO: email,
            // TERMINOS_Y_POLITICAS: terms_and_policies,
            ID_ROL: idRol.ID_ROL
        })

        //encrypt the password
        const salt = bcrypt.genSaltSync(15);
        DBUser.CONTRASENA = bcrypt.hashSync(password, salt);

        //Save the user in the DB.
        await DBUser.save();

        //Find the user created to save the password in the history
        const userCreated = await Users.findOne({where:{USUARIO: name}});

        //Save password in password history
        passHistory = await PasswordHistory.build({
            ID_USUARIO: userCreated.ID_USUARIO,
            CONTRASENA: DBUser.CONTRASENA
        })

        //Save the password in the DB.
        await passHistory.save();

        // Get created user ID
        const user = await Users.findOne({where:{USUARIO: name}});
        //Update who modified and created it
        await Users.update({
            CREADO_POR: user.ID_USUARIO,
            MODIFICADO_POR: user.ID_USUARIO
        },{
            where:{
                ID_USUARIO: user.ID_USUARIO
            }
        })
        
        return res.json({
            DBUser
        });
        
    } catch (error) {
        console.log(error);
        return res.json({
            msg: 'Error'
        });
    };
};

module.exports = {
    register
}


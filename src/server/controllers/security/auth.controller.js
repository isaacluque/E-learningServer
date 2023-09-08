const { response, request } = require("express");
const bcrypt = require('bcryptjs');

const Users = require("../../models/security/users.model");
const Parameter = require("../../models/security/parameter.model");
const Roles = require("../../models/security/role.model");
const generateJWT = require("../../helpers/generate-JWT.helper");
const generateEmails = require("../../helpers/generate-Emails.helper");

const login = async (req = request, res = response) => {
    //Extract body parameters
    const { email, password } = req.body;
    try {
        //Search for the user by their email
        const user = await Users.findOne({ where: { CORREO_ELECTRONICO: email } });
        const attemptManagement = await Parameter.findOne({ where: { PARAMETRO: 'ADMIN_INTENTOS' } })

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Email or password invalid'
            })
        }

        if(user.ESTADO_USUARIO === 'BLOCKED'){
            return res.status(401).json({
                ok: false,
                msg: `The user is blocked, talk to the administrator or change the password.`
            })
        }

        const validate_password = bcrypt.compareSync(password, user.CONTRASENA)
        if (!validate_password) {
            user.INTENTOS++
            console.log(user.INTENTOS);
            if (!(user.USUARIO === 'ROOT') && (user.INTENTOS === parseInt(attemptManagement.VALOR, 10))) {
                user.ESTADO_USUARIO = 'BLOCKED'

                await generateEmails(user.CORREO_ELECTRONICO, user.USUARIO);

                await user.save();

                return res.status(401).json({
                    ok: false,
                    msg: 'Your account has been blocked for exceeding the number of attempts allowed. Please change your password.'
                });
            }
            await user.save();

            return res.status(401).json({
                msg: 'Email or password invalid'
            });
        }

        

        //Get the duration of the session token
        const durationTokenSession = await Parameter.findOne({where:{PARAMETRO: 'DURANCION_TOKEN_SESION'}});
        //Generate JWT
        const token = await generateJWT(user.ID_USUARIO, durationTokenSession.VALOR, process.env.SEEDJWT);

        const roleName = await Roles.findByPk(user.ID_ROL);

        user.INTENTOS = 0;                        // Reset attempts to 0
        user.PRIMER_INGRESO++                     // Increase revenue counter
        user.FECHA_ULTIMA_CONEXION = new Date();  // Log last connection
        await user.save();

        

        return res.status(200).json({
            User: user,
            ok: true,
            // id_user : user.ID_USUARIO,
            // id_role: user.ID_ROL,
            // role: roleName.ROL,
            // state: user.ESTADO_USUARIO,
            // username: user.NOMBRE_USUARIO,
            // user: user.USUARIO,
            // email: user.CORREO_ELECTRONICO,
            token
        });

    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the administrator.'
        });
    }
};

const revalidateToken = async(req = request, res = response) => {

    // Get the uid of the token validator middleware
    const { uid } = req;

    // Buscar usuario
    const user = await Users.findByPk( uid );

    // If the user is blocked, their tokens are invalid.
    if( !(user.ESTADO_USUARIO === 'ACTIVE') ) {
        return res.status(401).json({
            ok: false,
            msg: 'The user does not have access, talk to the administrator'
        });
    };

    // Generate the JWT
    //Get the duration of the session token
    const durationTokenSession = await Parameter.findOne({where:{PARAMETRO: 'DURANCION_TOKEN_SESION'}});
    //Generate JWT
    const token = await generateJWT(uid, durationTokenSession.VALOR, process.env.SEEDJWT);

    const roleName = await Roles.findByPk(user.ID_ROL);

    return res.status(200).json({
        ok: true,
        id_user : user.ID_USUARIO,
        id_role: user.ID_ROL,
        role: roleName.ROL,
        state: user.ESTADO_USUARIO,
        username: user.NOMBRE_USUARIO,
        user: user.USUARIO,
        email: user.CORREO_ELECTRONICO,
        token
    });
};

module.exports = {
    login,
    revalidateToken
}
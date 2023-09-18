const { response, request } = require("express");
const bcrypt = require('bcryptjs');

const Parameter = require("../../models/security/parameter.model");
const generateJWT = require("../../helpers/generate-JWT.helper");
const generateEmails = require("../../helpers/generate-Emails.helper");
const Students = require("../../models/student/student.model");
const PYMEDetails = require("../../models/student/pyme-detail.model");
const ViewDetailsPYMEStudent = require("../../models/student/views/view-details-pyme-student.model");
const { Op } = require("sequelize");

const loginPYME = async (req = request, res = response) => {
    //Extract body parameters
    const { email, username, password } = req.body;
    try {
        //Search for the user by their email
        const student = await Students.findOne({ where: {[Op.or]: [{CORREO_ELECTRONICO: email}, {NOMBRE_USUARIO: username}]} });
        const attemptManagement = await Parameter.findOne({ where: { PARAMETRO: 'ADMIN_INTENTOS' } })

        if (!student) {
            return res.status(404).json({
                ok: false,
                msg: 'Email, username or password invalid'
            })
        }

        if(student.ESTADO === 'BLOCKED'){
            return res.status(401).json({
                ok: false,
                msg: `It's blocked, talk to the administrator or change the password.`
            })
        }

        const validate_password = bcrypt.compareSync(password, student.CONTRASENA)
        if (!validate_password) {
            student.INTENTOS++
            console.log(student.INTENTOS);
            if ((student.INTENTOS === parseInt(attemptManagement.VALOR, 10))) {
                student.ESTADO = 'BLOCKED'

                const usernamePYME = await PYMEDetails.findOne({ where: {ID_ESTUDIANTE: student.ID_ESTUDIANTE}});

                await generateEmails(student.CORREO_ELECTRONICO, usernamePYME.NOMBRE_USUARIO);

                await student.save();

                return res.status(401).json({
                    ok: false,
                    msg: 'Your account has been blocked for exceeding the number of attempts allowed. Please change your password.'
                });
            }
            await student.save();

            return res.status(401).json({
                msg: 'Email or password invalid'
            });
        }

        //Get the duration of the session token
        const durationTokenSession = await Parameter.findOne({where:{PARAMETRO: 'DURACION_TOKEN_SESION'}});
        //Generate JWT
        const token = await generateJWT(student.ID_ESTUDIANTE, durationTokenSession.VALOR, process.env.SEEDJWT);

        student.INTENTOS = 0;                        // Reset attempts to 0               // Increase revenue counter
        // user.FECHA_ULTIMA_CONEXION = new Date();  // Log last connection
        await student.save();

        return res.status(200).json({
            Student: student,
            ok: true,
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

const revalidateTokenPYME = async(req = request, res = response) => {

    // Get the uid of the token validator middleware
    const { uid } = req;

    // Buscar usuario
    const detailspymestudent = await ViewDetailsPYMEStudent.findByPk( uid );

    // If the user is blocked, their tokens are invalid.
    if( !(detailspymestudent.ESTADO === 'ACTIVE') ) {
        return res.status(401).json({
            ok: false,
            msg: 'The student does not have access, talk to the administrator'
        });
    };

    //Get the duration of the session token
    const durationTokenSession = await Parameter.findOne({where:{PARAMETRO: 'DURACION_TOKEN_SESION'}});
    //Generate JWT
    const token = await generateJWT(uid, durationTokenSession.VALOR, process.env.SEEDJWT);

    return res.status(200).json({
        ok: true,
        DetailsPYMEStudentToken: detailspymestudent,
        token
    });
};

module.exports = {
    loginPYME,
    revalidateTokenPYME
}
const { request, response } = require("express");
const Roles = require("../../models/security/role.model");
const StudentType = require("../../models/student/student-type.model");
const Students = require("../../models/student/student.model");
const Parameter = require("../../models/security/parameter.model");
const { createTransporter } = require("../../helpers/nodemailer.helper");
const PasswordHistory = require("../../models/security/password-history.model");
const bcrypt = require("bcryptjs");
const StudenDetails = require("../../models/student/student-detail.model");

const postStudentNormal = async (req = request, res = response) => {
    const { student_type } = req.query;

    const { email,
        password,
        confir_password,
        username,
        first_name,
        last_name } = req.body

    try {
        const studentType = parseInt(student_type, 10);

        //Validate that both passwords match
        if (password !== confir_password) {
            return res.status(400).json({
                ok: false,
                msg: 'Passwords do not match.'
            });
        };

        //Get the default role
        const idRol = await Roles.findOne({ where: { ROL: 'STUDENT' } });

        const idStudentType = await StudentType.findOne({ where: { ID_TIPO_ESTUDIANTE: studentType } });

        //Build the student in the model
        DBStudent = await Students.build({
            ID_TIPO_STUDIANTE: idStudentType,
            CORREO_ELECTRONICO: email,
            ID_ROL: idRol.ID_ROL
        })

        //encrypt the password
        const salt = bcrypt.genSaltSync(10);
        DBStudent.CONTRASENA = bcrypt.hashSync(password, salt);

        //Save the user in the DB.
        await DBStudent.save();

        //Find the user created to save the password in the history
        const studentCreated = await Students.findOne({ where: { CORREO_ELECTRONICO: email } });

        console.log({studentCreated});

        //Save password in password history
        passHistory = await PasswordHistory.build({
            ID_ESTUDIANTE: studentCreated.ID_ESTUDIANTE,
            CONTRASENA: DBStudent.CONTRASENA
        })

        //Save the password in the DB.
        await passHistory.save();

        // // Get created student ID
        // const student = await Students.findOne({ where: { CORREO_ELECTRONICO: email } });
        //Update who modified and created it
        await Students.update({
            CREADO_POR_USUARIO: studentCreated.ID_ESTUDIANTE,
            MODIFICADO_POR_ESTUDIANTE: studentCreated.ID_ESTUDIANTE
        }, {where: {ID_ESTUDIANTE: studentCreated.ID_ESTUDIANTE}})

        DBStudentDetails = await StudenDetails.build({
            ID_ESTUDIANTE: studentCreated.ID_ESTUDIANTE,
            NOMBRE_USUARIO: username,
            NOMBRE: first_name,
            APELLIDO: last_name,
        })

        await DBStudentDetails.save();

        //Parameters
        const nameCompany = await Parameter.findOne({ where: { PARAMETRO: 'NOMBRE_EMPRESA' } });
        const smtpUser = await Parameter.findOne({ where: { PARAMETRO: 'SMTP_USER' } });

        const transporter = await createTransporter();

        // send mail with defined transport object
        transporter.sendMail({
            from: `"${nameCompany.VALOR}" <${smtpUser.VALOR}>`, // sender address
            to: `${DBStudent.CORREO_ELECTRONICO}`, // list of receivers
            subject: "User created successfully! ✔", // Subject line
            text: "Hello Student?", // plain text body
            html: `<b>Your user ${DBStudentDetails.NOMBRE_USUARIO} has been created successfully!</b>`//, // html body
        });

        return res.status(200).json({
            DBStudent,
            DBStudentDetails
        })
    } catch (error) {
        console.log(error);
        return res.json({
            msg: 'Error'
        });
    }


}

module.exports = {
    postStudentNormal,
}
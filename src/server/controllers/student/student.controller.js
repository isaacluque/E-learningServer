const { request, response } = require("express");
const Roles = require("../../models/security/role.model");
const StudentType = require("../../models/student/student-type.model");
const Students = require("../../models/student/student.model");
const Parameter = require("../../models/security/parameter.model");
const { createTransporter } = require("../../helpers/nodemailer.helper");
const PasswordHistory = require("../../models/security/password-history.model");
const bcrypt = require("bcryptjs");
const StudenDetails = require("../../models/student/student-detail.model");
const PYMEDetails = require("../../models/student/pyme-detail.model");
const CompanySize = require("../../models/student/company-size.model");
const Location = require("../../models/student/location.model");

const postStudentNormal = async (req = request, res = response) => {
    const { email,
        password,
        confirm_password,
        username,
        first_name,
        last_name } = req.body

    try {
        const studentType = 1;

        //Validate that both passwords match
        if (password !== confirm_password) {
            return res.status(400).json({
                ok: false,
                msg: 'Passwords do not match.'
            });
        };

        //Get the default role
        const idRol = await Roles.findOne({ where: { ROL: 'STUDENT' } });

        const idStudentType = await StudentType.findOne({ where: { ID_TIPO_ESTUDIANTE: studentType } });
        console.log(idStudentType);
        //Build the student in the model
        DBStudent = await Students.build({
            ID_TIPO_ESTUDIANTE: idStudentType.ID_TIPO_ESTUDIANTE,
            CORREO_ELECTRONICO: email,
            ID_ROL: idRol.ID_ROL,
            ESTADO: 'ACTIVE'
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
            DBStudentDetails,
            ok: true,
            msg: 'Student created successfully!',
        })
    } catch (error) {
        console.log(error);
        return res.json({
            msg: 'Error'
        });
    }


}

const postStudentPYME = async (req = request, res = response) => {
    const { email,
        password,
        confirm_password,
        username,
        phone_number,
        company_name,
        company_size,
        location } = req.body

    try {
        const studentType = 2;

        //Validate that both passwords match
        if (password !== confirm_password) {
            return res.status(400).json({
                ok: false,
                msg: 'Passwords do not match.'
            });
        };

        //Get the default role
        const idRol = await Roles.findOne({ where: { ROL: 'PYME' } });

        const idStudentType = await StudentType.findOne({ where: { ID_TIPO_ESTUDIANTE: studentType } });
        console.log(idStudentType);
        //Build the student in the model
        DBStudent = await Students.build({
            ID_TIPO_ESTUDIANTE: idStudentType.ID_TIPO_ESTUDIANTE,
            CORREO_ELECTRONICO: email,
            ID_ROL: idRol.ID_ROL,
            ESTADO: 'PENDING'
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
            MODIFICADO_POR_ESTUDIANTE: studentCreated.ID_ESTUDIANTE
        }, {where: {ID_ESTUDIANTE: studentCreated.ID_ESTUDIANTE}})


        const companySize = await CompanySize.findOne({where:{ID_TAMANO_EMPRESA: parseInt(company_size,10)}});
        const companyLocation = await Location.findOne({where: {ID_UBICACION: location}})

        console.log({companySize});

        DBPYMEDetails = await PYMEDetails.build({
            ID_ESTUDIANTE: studentCreated.ID_ESTUDIANTE,
            NOMBRE_USUARIO: username,
            TELEFONO: phone_number,
            NOMBRE_EMPRESA: company_name,
            ID_TAMANO_EMPRESA: companySize.ID_TAMANO_EMPRESA,
            ID_UBICACION: companyLocation.ID_UBICACION
        })

        await DBPYMEDetails.save();

        //Parameters
        const nameCompany = await Parameter.findOne({ where: { PARAMETRO: 'NOMBRE_EMPRESA' } });
        const smtpUser = await Parameter.findOne({ where: { PARAMETRO: 'SMTP_USER' } });
        const smtpUserYahoo = await Parameter.findOne({where: {PARAMETRO: 'SMTP_USER_YAHOO'}})

        const transporter = await createTransporter();

        // send mail with defined transport object
        transporter.sendMail({
            from: `"${nameCompany.VALOR}" <${smtpUser.VALOR}>`, // sender address
            to: `${DBStudent.CORREO_ELECTRONICO}`, // list of receivers
            subject: "Pending Confirmation", // Subject line
            text: "Pending Confirmation", // plain text body
            html: `<b>${company_name} we will be in touch very soon.</b>`//, // html body
        });

        transporter.sendMail({
            from: `"${nameCompany.VALOR}" <${smtpUser.VALOR}>`, // sender address
            to: `${smtpUser.VALOR}`, // list of receivers
            subject: "PYME student confirmation", // Subject line
            text: "PYME student confirmation", // plain text body
            html: `<b>The ${company_name} company has been registered, please verify your data.</b>`//, // html body
        });

        return res.status(200).json({
            DBStudent,
            DBPYMEDetails,
            ok: true,
            msg: 'Student PYME created successfully!',
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
    postStudentPYME,
}
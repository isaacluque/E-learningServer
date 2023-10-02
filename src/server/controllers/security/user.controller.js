const { request, response } = require("express");

const bcrypt = require('bcryptjs');
const Roles = require("../../models/security/role.model");
const Users = require("../../models/security/users.model");
const PasswordHistory = require("../../models/security/password-history.model");

const { createTransporter } = require("../../helpers/nodemailer.helper");
const Parameter = require("../../models/security/parameter.model");
const { Op } = require("sequelize");
const CompanySize = require("../../models/student/company-size.model");
const Location = require("../../models/student/location.model");
const PYMEDetails = require("../../models/student/pyme-detail.model");
const ViewUsers = require("../../models/security/views/view-user.model");
const { generateEmailchanges } = require("../../helpers/generate-Emails.helper");

const registerStudent = async (req = request, res = response) => {
    //Extract body parameters
    const { name = "", username = "", email = "", password = "", confirm_password = ""} = req.body;
    try {
        //Validate that both passwords match
        if (password !== confirm_password) {
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
        const idRol = await Roles.findOne({ where: { ROL: 'STUDENT' } });

        //Build the user in the model
        DBUser = await Users.build({
            USUARIO: username,
            NOMBRE_USUARIO: name,
            CORREO_ELECTRONICO: email,
            // TERMINOS_Y_POLITICAS: terms_and_policies,
            ID_ROL: idRol.ID_ROL,
            ESTADO_USUARIO: 'ACTIVE'
        })

        //encrypt the password
        const salt = bcrypt.genSaltSync(10);
        DBUser.CONTRASENA = bcrypt.hashSync(password, salt);

        //Save the user in the DB.
        await DBUser.save();

        //Find the user created to save the password in the history
        const userCreated = await Users.findOne({ where: { USUARIO: username } });

        //Save password in password history
        passHistory = await PasswordHistory.build({
            ID_USUARIO: userCreated.ID_USUARIO,
            CONTRASENA: DBUser.CONTRASENA
        })

        //Save the password in the DB.
        await passHistory.save();

        // Get created user ID
        const user = await Users.findOne({ where: {CORREO_ELECTRONICO: email}});
        //Update who modified and created it
        await Users.update({
            CREADO_POR: user.ID_USUARIO,
            MODIFICADO_POR: user.ID_USUARIO
        }, {
            where: {
                ID_USUARIO: user.ID_USUARIO
            }
        })

        //Parameters
        const nameCompany = await Parameter.findOne({where:{PARAMETRO: 'NOMBRE_EMPRESA'}});
        const smtpUser = await Parameter.findOne({where:{PARAMETRO: 'SMTP_USER'}});

        const transporter = await createTransporter();
        
        // send mail with defined transport object
        transporter.sendMail({
            from: `"${nameCompany.VALOR}" <${smtpUser.VALOR}>`, // sender address
            to: `${DBUser.CORREO_ELECTRONICO}`, // list of receivers
            subject: "User created successfully! ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Your user ${DBUser.USUARIO} has been created successfully!</b>`//, // html body
        });

        return res.status(201).json({
            ok: true,
            msg: 'User created successfully!',
            User: DBUser
        });

    } catch (error) {
        console.log(error);
        return res.json({
            msg: 'Error'
        });
    };
}

const registerPYME = async (req = request, res = response) => {
    const { 
        name,
        email,
        password,
        confirm_password,
        username,
        phone_number,
        company_name,
        company_size,
        location } = req.body

    try {

        //Validate that both passwords match
        if (password !== confirm_password) {
            return res.status(400).json({
                ok: false,
                msg: 'Passwords do not match.'
            });
        };

        //Get the default role
        const idRol = await Roles.findOne({ where: { ROL: 'PYME' } });

        //Build the student in the model
        DBUser = await Users.build({
            USUARIO: username,
            NOMBRE_USUARIO: name, 
            CORREO_ELECTRONICO: email,
            ID_ROL: idRol.ID_ROL,
            ESTADO_USUARIO: 'PENDING'
        })

        //encrypt the password
        const salt = bcrypt.genSaltSync(10);
        DBUser.CONTRASENA = bcrypt.hashSync(password, salt);

        //Save the user in the DB.
        await DBUser.save();

        //Find the user created to save the password in the history
        const studentCreated = await Users.findOne({ where: { CORREO_ELECTRONICO: email } });

        //Save password in password history
        passHistory = await PasswordHistory.build({
            ID_USUARIO: studentCreated.ID_USUARIO,
            CONTRASENA: DBUser.CONTRASENA
        })

        //Save the password in the DB.
        await passHistory.save();

        // // Get created student ID
        // const student = await Students.findOne({ where: { CORREO_ELECTRONICO: email } });
        //Update who modified and created it
        await Users.update({
            CREADO_POR: studentCreated.ID_USUARIO,
            MODIFICADO_POR: studentCreated.ID_USUARIO
        }, {where: {ID_USUARIO: studentCreated.ID_USUARIO}})


        const companySize = await CompanySize.findOne({where:{ID_TAMANO_EMPRESA: company_size}});
        const companyLocation = await Location.findOne({where: {ID_UBICACION: location}})

        DBPYMEDetails = await PYMEDetails.build({
            ID_USUARIO: studentCreated.ID_USUARIO,
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
            to: `${DBUser.CORREO_ELECTRONICO}`, // list of receivers
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
            User: DBUser,
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

const getUsers = async (req = request, res = response) =>{

    let {lim, from = 0, search = ""} = req.query;

    try {

        if(!lim || lim === "") {
            const { VALOR } = await Parameter.findOne({where: {PARAMETRO: 'LIMITE_REGISTROS'}});
            lim = VALOR;
        }

        if(from === "") {
            from = 0;
        }

        const users = await ViewUsers.findAll({
            limit: parseInt(lim, 10),
            offset: parseInt(from, 10),
            where: {
                [Op.or]: [{
                    USUARIO: {
                        [Op.like]: `%${search}%`
                    }
                }, 
                {
                    NOMBRE_USUARIO: {
                        [Op.like]: `%${search}%`
                    },
                }, 
                {
                    ROL: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    CORREO_ELECTRONICO: {
                        [Op.like]: `%${search}%`
                    }
                }]
            }
        });

        const countUsers = await ViewUsers.count({ where: {
            [Op.or]: [
                {
                    USUARIO: {
                        [Op.like]: `%${search}%`
                    }
                }, 
                {
                    NOMBRE_USUARIO: {
                        [Op.like]: `%${search}%`
                    },
                }, 
                {
                    ROL: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    CORREO_ELECTRONICO: {
                        [Op.like]: `%${search}%`
                    }
                }]
        }})
    
        res.json({
            ok: true,
            lim,
            countUsers,
            search,
            ViewUser: users
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error
        })
    }

}

const getUser = async (req = request, res = response) =>{

    let {id_user} = req.params;

    try {
        const user = await ViewUsers.findAll({ where: {ID_USUARIO: id_user}})
    
        return res.json({
            ok: true,
            ViewUser: user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error
        })
    }

}

const putUser = async (req = request, res = response) => {

    const {id_user = ""} = req.params;

    const {user = "", username = "", status = "", id_role = "", email = "", id_social_network = "", id_modifier = ""} = req.body;

    try {
        const searchUser = await Users.findByPk(id_user);
    if(!searchUser) {
        return res.status(404).json({
            ok: false,
            msg: 'The student does not exist'
        })
    }

    //Avoid modifying the ROOT user
    if(searchUser.USUARIO === 'ROOT') {
        if(user !== ""){
            return res.status(404).json({
                ok: false,
                msg: 'You cannot modify the ROOT name'
            })
        }
        if(username !== ""){
            return res.status(404).json({
                ok: false,
                msg: 'You cannot modify the ROOT username'
            })
        }
        if(status !== ""){
            return res.status(404).json({
                ok: false,
                msg: 'You cannot modify the ROOT status'
            })
        }
        if(id_role !== ""){
            return res.status(404).json({
                ok: false,
                msg: 'You cannot modify the ROOT role'
            })
        }
        if(email !== ""){
            return res.status(404).json({
                ok: false,
                msg: 'You cannot modify the ROOT email'
            })
        }
    }

    if(! ((searchUser.USUARIO == username || username === "")
        &&(searchUser.NOMBRE_USUARIO == user || user === "")
        &&(searchUser.ESTADO_USUARIO == status || status === "")
        &&(searchUser.ID_ROL == id_role || id_role === "")
        &&(searchUser.CORREO_ELECTRONICO == email || email === ""))){

            await generateEmailchanges(id_user, user, username, status, id_role, email, imagen,searchUser.USUARIO, searchUser.NOMBRE_USUARIO, searchUser.ESTADO_USUARIO, searchUser.ID_ROL, searchUser.CORREO_ELECTRONICO); 
    }

    await searchUser.update({
        USUARIO: username !== "" ? username : Users.USUARIO,
        NOMBRE_USUARIO: user !== "" ? user : Users.NOMBRE_USUARIO,
        ESTADO_USUARIO: status !== "" ? status : Users.ESTADO_USUARIO,
        ID_ROL: id_role !== "" ? id_role : Users.ID_ROL,
        CORREO_ELECTRONICO: email !== "" ? email : Users.CORREO_ELECTRONICO,
        MODIFICADO_POR: id_modifier
    }, {
        where: {
            ID_USUARIO: id_user
        }
    });

    if(email !== "" &&(username === "" && status === "" && id_role === "" && user === "")) {
        return res.status(200).json({
            ok: true,
            msg: 'The email has been updated.'
        })
    }

    if(username !== "" &&(user === "" && status === "" && id_role === "" && email === "")) {
        return res.status(200).json({
            ok: true,
            msg: 'The username has been updated.'
        })
    }

    return res.json({
        ok: true,
        msg: `${searchUser.USUARIO} user data has been updated`
    });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the administrator.'
        })
    }
    
}



module.exports = {
    registerStudent,
    registerPYME,
    getUsers,
    getUser,
    putUser
}


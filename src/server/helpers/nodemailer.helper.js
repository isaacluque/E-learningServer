const nodemailer = require("nodemailer");

const Parameter = require('../models/security/parameter.model');
const ViewUsers = require("../models/security/views/view-user.model");



const createTransporterGmail = async(email, user, msg) => {
    
    //Parameters
const smtpPort = await Parameter.findOne({where:{PARAMETRO: 'SMTP_PORT'}});
const smtpUser = await Parameter.findOne({where:{PARAMETRO: 'SMTP_USER'}});
const smtpPassword = await Parameter.findOne({where:{PARAMETRO: 'SMTP_PASSWORD'}});
const nameCompany = await Parameter.findOne({where:{PARAMETRO: 'NOMBRE_EMPRESA'}});

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: smtpPort.VALOR,
        secure: true,
        auth: {
          user: smtpUser.VALOR,
          pass: smtpPassword.VALOR
        }
      });

      // send mail with defined transport object
      return transporter.sendMail({
        from: `"${nameCompany.VALOR}" <${smtpUser.VALOR}>`, // sender address
        to: `${email}`, // list of receivers
        subject: "User locked!", // Subject line
        text: `${user} ${msg}`, // plain text body
        html: `<b>${user} ${msg}</b>`, // html body
    });
}

const createTransporterYahoo = async(email, user, msg) => {
    //Parameters
const smtpPort = await Parameter.findOne({where:{PARAMETRO: 'SMTP_PORT'}});
const smtpUser = await Parameter.findOne({where:{PARAMETRO: 'SMTP_USER_YAHOO'}});
const smtpPassword = await Parameter.findOne({where:{PARAMETRO: 'SMTP_PASSWORD_YAHOO'}});
const nameCompany = await Parameter.findOne({where:{PARAMETRO: 'NOMBRE_EMPRESA'}});
    

    const transporter = nodemailer.createTransport({
        host: "smtp.mail.yahoo.com",
        port: smtpPort.VALOR,
        secure: true,
        auth: {
          user: smtpUser.VALOR,
          pass: smtpPassword.VALOR
        }
      });

      // send mail with defined transport object
      return transporter.sendMail({
        from: `"${nameCompany.VALOR}" <${smtpUser.VALOR}>`, // sender address
        to: `${email}`, // list of receivers
        subject: "User locked!", // Subject line
        text: `${user} ${msg}`, // plain text body
        html: `<b>${user} ${msg}</b>`, // html body
    });
}

const createTransporter = async() => {
    
  //Parameters
const smtpPort = await Parameter.findOne({where:{PARAMETRO: 'SMTP_PORT'}});
const smtpUser = await Parameter.findOne({where:{PARAMETRO: 'SMTP_USER'}});
const smtpPassword = await Parameter.findOne({where:{PARAMETRO: 'SMTP_PASSWORD'}});

  return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: smtpPort.VALOR,
      secure: true,
      auth: {
        user: smtpUser.VALOR,
        pass: smtpPassword.VALOR
      }
    });
}

const createTransporterGmailChange = async(
  id_user,
  user = "",
  username = "",
  status = "",
  id_role = "",
  email = "",
  imagen = "",
  UserModel,
  usernameModel,
  statusModel,
  id_roleModel,
  emailModel,
  imagenModel) => {
    
  //Parameters
const smtpPort = await Parameter.findOne({where:{PARAMETRO: 'SMTP_PORT'}});
const smtpUser = await Parameter.findOne({where:{PARAMETRO: 'SMTP_USER'}});
const smtpPassword = await Parameter.findOne({where:{PARAMETRO: 'SMTP_PASSWORD'}});
const nameCompany = await Parameter.findOne({where:{PARAMETRO: 'NOMBRE_EMPRESA'}});
const role = await ViewUsers.findByPk(id_user);

  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: smtpPort.VALOR,
      secure: true,
      auth: {
        user: smtpUser.VALOR,
        pass: smtpPassword.VALOR
      }
    });

    // send mail with defined transport object
    return transporter.sendMail({
      from: `"${nameCompany.VALOR}" <${smtpUser.VALOR}>`, // sender address
      to: `${emailModel}`, // list of receivers
      subject: "Your account details have been updated!", // Subject line
      text: `${UserModel}, your account details have been updated.`, // plain text body
      html: `<b>Updated Data</b><br><br>
            ${(user !== "" && UserModel != user) ? `Name: <strong>${user}</strong><br>`: ''}
            ${(username !== "" && usernameModel != username) ? `Name: <strong>${username}</strong><br>`: ''}
            ${(status !== "" && statusModel != status) ? `Ststus: <strong>${ststus}</strong><br>` : ""}
            ${(email !== "" && emailModel != email) ? `Email: <strong>${email}</strong><br>`: ''}
            ${(id_role !== "" && id_roleModel != id_role) ? `Role: <strong>${role.ROL}</strong><br>`: ''}
            ${(imagen !== "" && imagenModel != imagen) ? `Imagen: <strong>${imagen}</strong><br>`: ''}`, // html body
  });
}
const createTransporterYahooChange = async(
  id_user,
  user = "",
  username = "",
  status = "",
  id_role = "",
  email = "",
  imagen = "",
  UserModel,
  usernameModel,
  statusModel,
  id_roleModel,
  emailModel,
  imagenModel) => {
    
  //Parameters
  const smtpPort = await Parameter.findOne({where:{PARAMETRO: 'SMTP_PORT'}});
  const smtpUser = await Parameter.findOne({where:{PARAMETRO: 'SMTP_USER_YAHOO'}});
  const smtpPassword = await Parameter.findOne({where:{PARAMETRO: 'SMTP_PASSWORD_YAHOO'}});
  const nameCompany = await Parameter.findOne({where:{PARAMETRO: 'NOMBRE_EMPRESA'}}); 
  const role = await ViewUsers.findByPk(id_user);

  const transporter = nodemailer.createTransport({
      host: "smtp.mail.yahoo.com",
      port: smtpPort.VALOR,
      secure: true,
      auth: {
        user: smtpUser.VALOR,
        pass: smtpPassword.VALOR
      }
    });

    // send mail with defined transport object
    return transporter.sendMail({
      from: `"${nameCompany.VALOR}" <${smtpUser.VALOR}>`, // sender address
      to: `${emailModel}`, // list of receivers
      subject: "Your account details have been updated!", // Subject line
      text: `${UserModel}, your account details have been updated.`, // plain text body
      html: `<b>Updated Data</b><br><br>
            ${(user !== "" && UserModel != user) ? `Name: <strong>${user}</strong><br>`: ''}
            ${(username !== "" && usernameModel != username) ? `Name: <strong>${username}</strong><br>`: ''}
            ${(status !== "" && statusModel != status) ? `Ststus: <strong>${ststus}</strong><br>` : ""}
            ${(email !== "" && emailModel != email) ? `Email: <strong>${email}</strong><br>`: ''}
            ${(id_role !== "" && id_roleModel != id_role) ? `Role: <strong>${role.ROL}</strong><br>`: ''}
            ${(imagen !== "" && imagenModel != imagen) ? `Imagen: <strong>${imagen}</strong><br>`: ''}`, // html body
  });
}

module.exports = {
    createTransporterGmail,
    createTransporterYahoo,
    createTransporter,
    createTransporterGmailChange,
    createTransporterYahooChange,
};
    
const nodemailer = require("nodemailer");

const Parameter = require('../models/security/parameter.model')



const createTransporterGmail = async(email, user) => {
    
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
        text: `${user} your account has been blocked for exceeding the number of attempts allowed. Please change your password.`, // plain text body
        html: `<b>${user} your account has been blocked for exceeding the number of attempts allowed. Please change your password.</b>`, // html body
    });
}
const createTransporterYahoo = async(email, user) => {
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
        text: `${user} your account has been blocked for exceeding the number of attempts allowed. Please change your password.`, // plain text body
        html: `<b>${user} your account has been blocked for exceeding the number of attempts allowed. Please change your password.</b>`, // html body
    });
}


module.exports = {
    createTransporterGmail,
    createTransporterYahoo
};
    
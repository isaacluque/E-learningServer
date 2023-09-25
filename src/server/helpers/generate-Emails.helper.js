const { createTransporterYahoo, createTransporterGmail, createTransporterGmailChange, createTransporterYahooChange } = require("../helpers/nodemailer.helper");

const generateEmails = async(email, user) =>{
    let regdx = /(@yahoo.com)/;
    let regdx2 = /(@gmail.com)/;
    let regdx3 = /(@gs1hn.org)/;
    let regdx4 = /(@unah.hn)/;
        
        if(regdx.test(email)){
            return await createTransporterYahoo(email, user);
        }

        if(regdx2.test(email) ){
            return await createTransporterGmail(email, user);
        }

        if(regdx3.test(email) ){
            return await createTransporterYahoo(email, user);
        }

        if(regdx4.test(email) ){
            return await createTransporterGmail(email, user);
        }
    
}

const generateEmailchanges = async (
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
    let regdx = /(@yahoo.com)/;
    let regdx2 = /(@gmail.com)/;
    let regdx3 = /(@gs1hn.org)/;
    let regdx4 = /(@unah.hn)/;

    if(regdx.test(emailModel)){
        return await createTransporterYahooChange(id_user, user, username, status, id_role, email, imagen, UserModel ,usernameModel, statusModel, id_roleModel, emailModel, imagenModel);
    }
    if(regdx2.test(emailModel)){
        return await createTransporterGmailChange(id_user, user, username, status, id_role, email, imagen, UserModel ,usernameModel, statusModel, id_roleModel, emailModel, imagenModel);
    }
    if(regdx3.test(emailModel)){
        return await createTransporterYahooChange(id_user, user, username, status, id_role, email, imagen, UserModel ,usernameModel, statusModel, id_roleModel, emailModel, imagenModel);
    }
    if(regdx4.test(emailModel)){
        return await createTransporterGmailChange(id_user, user, username, status, id_role, email, imagen, UserModel ,usernameModel, statusModel, id_roleModel, emailModel, imagenModel);
    }
}

module.exports = {
    generateEmails,
    generateEmailchanges
};
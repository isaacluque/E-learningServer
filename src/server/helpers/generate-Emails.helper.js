const { createTransporterYahoo, createTransporterGmail } = require("../helpers/nodemailer.helper");

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

module.exports = generateEmails;
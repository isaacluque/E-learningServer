const { response, request } = require("express");

const validateSpacesLogin = (req = request, res = response, next) => {

    const { email = "", password = "" } = req.body;

    // Validate that there is no white space
    if ( email.includes(' ') || password.includes(' ') ) {
        return res.status(400).json({
            ok: false,
            msg: 'Spaces are not allowed in the email/password.'
        })
    }

    //TODO OK!
    next();

}

const validateSpace = async( field = '' ) => {
    // Validate that there is no white space
    if ( field.includes(' ') ) {
        throw new Error()   
        
    }
};

const validateDoubleSpace = async( field = '' ) => {
    // Validate that there is no white space
    if ( field.includes('  ') ) {
        throw new Error()   
        
    }
};

module.exports = {
    validateSpacesLogin,
    validateSpace,
    validateDoubleSpace
}
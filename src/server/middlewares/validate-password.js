const { response, request } = require("express");
const passwordValidator = require('password-validator');

//validation configuration
const schema = new passwordValidator();
schema
    .has().min(1).uppercase(1, 'At least one uppercase character')  // Contain min 1 Uppercase
    .has().min(1).lowercase(1, 'At least one lowercase character')  // Contain min 1 Lowercase
    .has().min(1).symbols(1, 'At least one special character')      // Contain min 1 symbol
    .has().min(1).digits(1, 'At least one numeric character')       // Contain min 1 number

// Middleware validator
const validatePassword = (req = request, res = response, next) => {

    // read body password
    const { password } = req.body;

    if (password.includes(' ')) {
        return res.status(400).json({
            ok: false,
            msg: 'Blank spaces are not allowed in the password'
        })
    }

    if ( !schema.validate( password ) ) {
        const [message] = schema.validate( password, {details: true} )
        return res.status(400).json({
            ok: false,
            msg: message.message
        })
    }


    //TODO OK!
    next();

}

// Validator for parameter middleware
const validatePasswordParameter = ( value, res ) => {

    if ( !schema.validate( value ) ) {
        const [message] = schema.validate( value, {details: true} )
        return message.message;
    }
    
}

module.exports = {
    validatePassword,
    validatePasswordParameter
}
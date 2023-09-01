const { validationResult } = require('express-validator')

const validateFields = (req, res, next) => {
    const errors = validationResult( req );
    // If there are errors
    if ( !errors.isEmpty() ) {

        const { msg } = errors.errors[0]    // extract error message

        // fire the bug
        return res.status(400).json({
            ok: false,
            msg
        })
    }

    next();
}

module.exports = {
    validateFields
}
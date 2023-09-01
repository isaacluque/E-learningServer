const { response, request } = require("express");
const jwt = require('jsonwebtoken');

// Valid login token
const validateJWT = (req, res = response, next) => {

    // Read token from header
    const token = req.header('x-token');

    try {

        // Use login seed
        const { uid } = jwt.verify( token, process.env.SEMILLA_SECRETA_JWT_LOGIN );
        req.uid = uid;
        
    } catch (error) {
        // Token expired error
        if( error instanceof jwt.TokenExpiredError ) {
            return res.status(401).json({
                ok: false,
                msg: 'Your session has expired',
                cod: 'T-401'
            })
        }

        // Modified or invalid token
        return res.status(401).json({
            ok: false,
            msg: 'invalid token',
            cod: 'T-400'
        })
    }

    //TODO OK!
    next();

}

module.exports = {
    validateJWT,
}
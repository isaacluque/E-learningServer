const jwt = require('jsonwebtoken');

const generateJWT = (uid = '', duration, SeedJWT) => {
    
    return new Promise ((resolve, reject) => {
        
        const payload = {uid};
        jwt.sign(payload, SeedJWT, {
            expiresIn: duration
        }, (err, token) => {
            if(err){
                console.log(err);
                reject(err)
            } else {
                resolve(token);
            }
        })

    });
 }

module.exports = generateJWT;
const jwt = require('jsonwebtoken');

const generateJWT = (uid, duration, SeedJWT) => {
    
    const payload = {uid};
    return new Promise ((resolve, reject) => {
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
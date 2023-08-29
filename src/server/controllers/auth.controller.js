const { response, request } = require("express");
const Users = require("../models/security/users.model");



const login = async(req = request , res = response) => {
    //Extract body parameters
    const {email, password} = req.body;
    try {
        //Search for the user by their email
    const user = await Users.findOne({where: {CORREO_ELECTRONICO: email}});
    const intentos = parseInt(user.INTENTOS, 10);
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'Email or password invalid'
            })
        }

        if(user.USUARIO ==='ROOT' && intentos === 6 ){
            return res.json({
                msg: `Inactive user ${user.USUARIO}`
            })
        }

        if(password != user.CONTRASENA ){
            user.INTENTOS++
            console.log(user.INTENTOS);
            res.json({
                msg: 'Email or password invalid'
            })
            

            await user.save();
        }

        return res.json({
            email,
            password
        })

        
        
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Bye'
        });
        
    }
    
};

module.exports = {
    login
}
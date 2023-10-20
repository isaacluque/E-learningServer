const { request, response } = require('express');
const Users = require('../../models/security/users.model');
const ViewUsers = require('../../models/security/views/view-user.model');
const sharp = require('sharp');
const { uploadImage } = require('../../cloudinary/config');


const subirimagen = async (req, res) => {
    const { id_user } = req.params;
    const {image} = req.files;

    // console.log(image)

    try {

        const result = await uploadImage(image.tempFilePath);
            // console.log(result)

        await Users.update({ 
            IMAGE: result.secure_url, 
            ID_PUBLIC: result.public_id 
        }, { 
            where: { 
                ID_USUARIO: id_user 
            } 
        });

        res.json({
            msg: 'Imagen subida'
        })
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
}



const getImageUser = async (req, res) => {
    const { id_user } = req.params;


    try {

        const user = await Users.findOne({ where: { ID_USUARIO: id_user } });

        if (!user) {
            res.status(404).json({ message: 'No se encontró una imagen para el ID de usuario proporcionado' });
        }

        res.json({
            user
        })

    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
}

const allImages = async (req, res) => {
    try {

        const users = await ViewUsers.findAll();

      
          res.json(users);
    } catch (error) {
        
    }
}

module.exports = {
    subirimagen,
    getImageUser,
    allImages,
}
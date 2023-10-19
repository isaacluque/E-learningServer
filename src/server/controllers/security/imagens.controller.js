const { request, response } = require('express');
const Users = require('../../models/security/users.model');
const ViewUsers = require('../../models/security/views/view-user.model');
const sharp = require('sharp');

const subirimagen = async (req, res) => {
    const { id_user } = req.params;
    const image = req.file;

    console.log(image)

    try {
        await Users.update({ IMAGEN: image.buffer, MIMETYPE: image.mimetype }, { where: { ID_USUARIO: id_user } });

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

        // Recupera el campo BLOB de la imagen del usuario
        const imageData = user.IMAGEN;

        // Verifica que haya datos de imagen
        if (!imageData) {
            return res.status(404).send('Imagen no encontrada');
        }

        const processedImage = await sharp(imageData)
            .resize(200, 200) // Redimensiona la imagen a 200x200 píxeles
            .toBuffer();

        // Configura el tipo de contenido de la respuesta
        res.contentType(`${user.MIMETYPE}`); // Cambia a 'image/png' si es un PNG

        // Envía los datos de la imagen al navegador

        console.log(imageData);
        res.send(imageData);
        


    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
}

const allImages = async (req, res) => {
    try {

        const users = await ViewUsers.findAll();
        const imageUrls = [];
        
        users.forEach((user) => {
            if (user.IMAGEN) {
              const imageUrl = `data:${user.MIMETYPE};base64,${user.IMAGEN.toString('base64')}`;
              imageUrls.push(imageUrl);
            }
          });
      
          res.json(imageUrls);
    } catch (error) {
        
    }
}

module.exports = {
    subirimagen,
    getImageUser,
    allImages,
}
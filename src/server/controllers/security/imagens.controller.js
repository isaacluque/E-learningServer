const { request, response } = require('express');
const fs = require('fs');
const sharp = require('sharp');

const Imagens = require('../../models/security/imagen.model');
const Users = require('../../models/security/users.model');
const path = require('path');
const ViewUsers = require('../../models/security/views/view-user.model');


const subirImagen = async (req = request, res = response) => {
    const { id_user } = req.params;


    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                msg: 'No files were uploaded.'
            });
        }

        const { photo } = req.files;

        // Leer el contenido de la foto
        const fotoData = photo.data;

        const img = Imagens.build({
            ID_USUARIO: id_user,
            RUTA: fotoData
        })
        img.save();
        res.json('File uploaded!');
        ;

    } catch (error) {
        console.log(error);
        return res.json({ error })
    }
}

const getImagenes = async (req, res) => {
    try {
        const userImagen = await ViewUsers.findAll();

        res.json({
            ViewUser: userImagen
        })
    } catch (error) {
        return res.json({
            ok: false,
            msg: error
        })
    }
}

module.exports = {
    subirImagen,
    getImagenes,
    // actualizarImagen,
    // mostrarImagen
}
const cloudinary = require('cloudinary').v2;

const { CLOUD_NAME,
        API_KEY,
        API_SECRET,} = process.env

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'image-users'
    })
}


module.exports = {
    uploadImage
}
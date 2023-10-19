const { Router } = require('express');
const Users = require('../../models/security/users.model');


const router = Router();

const multer = require('multer');
const { subirimagen, allImages, getImageUser } = require('../../controllers/security/imagens.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.post('/:id_user', upload.single('image'), subirimagen);

router.get('/image/:id_user', getImageUser)

router.get('/getAll', allImages)

module.exports = router;
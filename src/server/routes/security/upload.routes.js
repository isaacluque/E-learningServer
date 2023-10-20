const { Router } = require('express');
const Users = require('../../models/security/users.model');
const { subirimagen, allImages, getImageUser } = require('../../controllers/security/imagens.controller');


const router = Router();

// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../../photos' )
//     }
//   })
// const upload = multer({ storage: storage });



router.post('/:id_user', subirimagen);

router.get('/image/:id_user', getImageUser)

router.get('/getAll', allImages)

module.exports = router;
const { Router } = require('express');

const { check } = require('express-validator');
const { existUser, validateUserSpaces } = require('../../middlewares/user-validation');
const { validatePasswordLength } = require('../../middlewares/validate-Password-Length');
const { validatePassword } = require('../../middlewares/validate-password');
const { validateFields } = require('../../middlewares/validate-Fields');
const { emailExisting } = require('../../middlewares/db-Validator');
const { validateSpace } = require('../../middlewares/validate-spaces');
const { register } = require('../../controllers/security/user.controller');


const router = Router();

router.post('/register',[
    //user validations
    check('name', 'user validations').not().isEmpty(),
    check('name', 'The maximum number of characters is 15').isLength({max: 15}),
    check('name', 'Whitespace is not allowed in user').custom(validateSpace),
    check('name', 'User can only contain letters').isAlpha('es-ES'),
    // username validations
    check('username', 'Username is required').not().isEmpty(),
    validateUserSpaces,
    // email validations
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExisting),
    // validate password
    existUser,
    validatePasswordLength,
    validatePassword,
    validateFields
], register);


module.exports = router;
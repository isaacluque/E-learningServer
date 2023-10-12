const { Router } = require('express');

const { check, body } = require('express-validator');
const { existUser, validateUserSpaces, existUserUpdated } = require('../../middlewares/user-validation');
const { validatePasswordLength } = require('../../middlewares/validate-Password-Length');
const { validatePassword } = require('../../middlewares/validate-password');
const { validateFields } = require('../../middlewares/validate-Fields');
const { emailExisting, emailExistingUpdate } = require('../../middlewares/db-Validator');
const { validateSpace, validateDoubleSpace } = require('../../middlewares/validate-spaces');
const { registerStudent, registerPYME, getUsers, getUser, putUser, putBlockUser, putActivateUser } = require('../../controllers/security/user.controller');
const { subirImagen, getImagenes } = require('../../controllers/security/imagens.controller');


const router = Router();

router.post('/register-student',[
    //user validations
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'No more than 2 blank spaces are allowed in your name.').custom(validateDoubleSpace),
    check('name', 'User can only contain letters').isAlpha('es-ES', {ignore:' '}),
    // username validations
    check('username', 'Username is required').not().isEmpty(),
    check('username', 'The maximum number of characters is 15').isLength({max: 15}),
    check('username', 'The minimum number of characters is 8').isLength({min: 4}),
    check('username', 'Whitespace is not allowed in user').custom(validateSpace),
    validateUserSpaces,
    // email validations
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExisting),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'The maximum number of characters is 12').isLength({max: 12}),
    check('password', 'Blanks are not allowed in the password').custom(validateSpace),
    check('confirm_password', 'Blank spaces are not allowed in the password confirmation').custom(validateSpace),
    check('confirm_password', 'Confirmation password is required').not().isEmpty(),
    check('confirm_password', 'The minimum number of characters is 8').isLength({min: 8}),
    // validate password
    existUser,
    validatePasswordLength,
    validatePassword,
    validateFields
], registerStudent);

router.post('/register-pyme', [
    //user validations
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'No more than 2 blank spaces are allowed in your name.').custom(validateDoubleSpace),
    check('name', 'User can only contain letters').isAlpha('es-ES', {ignore:' '}),
    // username validations
    check('username', 'Username is required').not().isEmpty(),
    check('username', 'The maximum number of characters is 15').isLength({max: 15}),
    check('username', 'The minimum number of characters is 8').isLength({min: 8}),
    check('username', 'Whitespace is not allowed in user').custom(validateSpace),
    validateUserSpaces,
    // email validations
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExisting),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'The maximum number of characters is 12').isLength({max: 12}),
    check('password', 'Blanks are not allowed in the password').custom(validateSpace),
    check('confirm_password', 'Blank spaces are not allowed in the password confirmation').custom(validateSpace),
    check('confirm_password', 'Confirmation password is required').not().isEmpty(),
    check('confirm_password', 'The minimum number of characters is 8').isLength({min: 8}),
    check('phone_number', 'Phone number is required').not().isEmpty(),
    check('company_name', 'Company name is required').not().isEmpty(),
    check('company_size', 'Company size is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    existUser,
    validatePasswordLength,
    validatePassword,
    validateFields
],registerPYME);

router.get('/', getUsers);

router.get('/:id_user', getUser)

router.put('/update-user/:id_user', [
    check('username', 'Username must be letters').if(body('username').exists()).if(body('username').not().equals('')).isAlpha('es-ES', {ignore: ' '}),
    check('user', 'The user must be letters or already exists').if(body('user').exists()).if(body('user').not().equals('')).isAlpha('es-ES', {ignore: ' '}),
    check('email', 'The email already exists or is invalid').if(body('email').exists()).if(body('email').not().equals('')).isEmail(),
    emailExistingUpdate,
    existUserUpdated,
    validateFields
], putUser);

router.post('/imagen/:id_user', subirImagen);

router.get('/imagen/users', getImagenes)

router.put('/blocked/:id_user', putBlockUser);

router.put('/actived/:id_user', putActivateUser);

module.exports = router;
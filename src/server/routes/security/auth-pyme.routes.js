const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/validate-Fields');
const { validateSpacesLogin } = require('../../middlewares/validate-spaces');
const { validateJWT } = require('../../middlewares/validate-JWT');
const { loginPYME, revalidateTokenPYME } = require('../../controllers/security/auth-pyme.controller');

const router = Router();

router.post('/login-pyme', [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    validateSpacesLogin,
    validateFields
],loginPYME);

//Validate and revalidate token
router.get('/revalidatePYME', [
    validateJWT
], revalidateTokenPYME)

module.exports = router;
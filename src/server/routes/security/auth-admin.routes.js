const { Router } = require('express');
const { login, revalidateToken } = require('../../controllers/security/auth-admin.controller');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/validate-Fields');
const { validateSpacesLogin } = require('../../middlewares/validate-spaces');
const { validateJWT } = require('../../middlewares/validate-JWT');

const router = Router();

router.post('/login-admin', [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateSpacesLogin,
    validateFields
],login);

//Validate and revalidate token
router.get('/revalidateAdmin', [
    validateJWT
], revalidateToken)

module.exports = router;


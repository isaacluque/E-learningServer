const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/validate-Fields');
const { validateSpacesLogin } = require('../../middlewares/validate-spaces');
const { validateJWT } = require('../../middlewares/validate-JWT');
const { loginStudent, revalidateTokenStudent } = require('../../controllers/security/auth-student.controller');

const router = Router();

router.post('/login-student', [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateSpacesLogin,
    validateFields
],loginStudent);

//Validate and revalidate token
router.get('/revalidateStudent', [
    validateJWT
], revalidateTokenStudent)

module.exports = router;
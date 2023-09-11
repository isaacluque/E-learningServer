const { Router } = require('express');
const { postStudentNormal } = require('../../controllers/student/student.controller');
const { check } = require('express-validator');
const { validateSpace } = require('../../middlewares/validate-spaces');
const { emailStudentExisting } = require('../../middlewares/db-Validator');
const { validateFields } = require('../../middlewares/validate-Fields');
const { validatePassword } = require('../../middlewares/validate-password');
const { validatePasswordLength } = require('../../middlewares/validate-Password-Length');

const router = Router();

router.post('/student_normal', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('email').custom(emailStudentExisting),
    check('password', 'Password is required').not().isEmpty(),
    check('confirm_password', 'Confirmation password is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('username', 'The maximum number of characters is 15').isLength({max: 15}),
    check('username', 'Whitespace is not allowed in user').custom(validateSpace),
    check('username', 'User can only contain letters').isAlpha('es-ES'),
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    validatePasswordLength,
    validatePassword,
    validateFields
],postStudentNormal)

module.exports = router;
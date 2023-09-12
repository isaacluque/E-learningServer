const { Router } = require('express');
const { postStudentNormal, postStudentPYME } = require('../../controllers/student/student.controller');
const { check } = require('express-validator');
const { validateSpace } = require('../../middlewares/validate-spaces');
const { emailStudentExisting } = require('../../middlewares/db-Validator');
const { validateFields } = require('../../middlewares/validate-Fields');
const { validatePassword } = require('../../middlewares/validate-password');
const { validatePasswordLength } = require('../../middlewares/validate-Password-Length');
const { validateUserSpaces } = require('../../middlewares/user-validation');
const { existStudentNormal, existStudentPYME } = require('../../middlewares/student-validation');

const router = Router();

router.post('/student_normal', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('email').custom(emailStudentExisting),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'The maximum number of characters is 12').isLength({max: 12}),
    check('password', 'Blanks are not allowed in the password').custom(validateSpace),
    check('confirm_password', 'Blank spaces are not allowed in the password confirmation').custom(validateSpace),
    check('confirm_password', 'Confirmation password is required').not().isEmpty(),
    check('confirm_password', 'The minimum number of characters is 8').isLength({min: 8}),
    check('username', 'Username is required').not().isEmpty(),
    check('username', 'The maximum number of characters is 15').isLength({max: 15}),
    check('username', 'The minimum number of characters is 8').isLength({min: 8}),
    check('username', 'Whitespace is not allowed in user').custom(validateSpace),
    check('first_name', 'First name is required').not().isEmpty(),
    check('first_name', 'User can only contain letters').isAlpha('es-ES', {ignore: ' '}),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('last_name', 'User can only contain letters').isAlpha('es-ES', {ignore: ' '}),
    existStudentNormal,
    validateUserSpaces,
    validatePasswordLength,
    validatePassword,
    validateFields
],postStudentNormal)

router.post('/student_pyme', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('email').custom(emailStudentExisting),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'The maximum number of characters is 12').isLength({max: 12}),
    check('password', 'Blanks are not allowed in the password').custom(validateSpace),
    check('confirm_password', 'Blank spaces are not allowed in the password confirmation').custom(validateSpace),
    check('confirm_password', 'Confirmation password is required').not().isEmpty(),
    check('confirm_password', 'The minimum number of characters is 8').isLength({min: 8}),
    check('username', 'Username is required').not().isEmpty(),
    check('username', 'The maximum number of characters is 15').isLength({max: 15}),
    check('username', 'The minimum number of characters is 8').isLength({min: 8}),
    check('username', 'Whitespace is not allowed in user').custom(validateSpace),
    existStudentPYME,
    validatePasswordLength,
    validatePassword,
    validateFields
],postStudentPYME)

module.exports = router;
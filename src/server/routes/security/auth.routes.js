const { Router } = require('express');
const { login } = require('../../controllers/auth.controller');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/validate-Fields');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],login);

module.exports = router;


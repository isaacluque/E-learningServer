const { Router } = require('express');
const { getRoles } = require('../../controllers/security/role.controller');

const router = Router();

router.get('/', getRoles)

module.exports = router;

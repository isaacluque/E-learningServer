const { Router } = require('express');
const { getCompanySizes, getCompanySize } = require('../../../controllers/student/company-size.controller');
const router = Router();

router.get('/', getCompanySizes);
router.get('/:id', getCompanySize);

module.exports = router;
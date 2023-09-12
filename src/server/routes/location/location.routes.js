const { Router } = require('express');
const { getLocations } = require('../../controllers/student/location.controller');
const router = Router();

router.get('/', getLocations);

module.exports = router;
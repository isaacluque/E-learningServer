const { Router } = require('express');
const { getLocations, getLocation } = require('../../../controllers/student/location.controller');
const router = Router();

router.get('/', getLocations);
router.get('/:id', getLocation);

module.exports = router;
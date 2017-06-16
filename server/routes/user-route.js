const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')();
const userService = require('../services/user-service');

router.post('/profile', auth.authenticate(), userService.updateProfile);

module.exports = router;

const express = require('express');
const router = express.Router();
const registerService = require('../services/register-service');

router.post('/register', registerService);

module.exports = router;

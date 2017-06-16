const express = require('express');
const router = express.Router();
const loginService = require('../services/login-service');

router.post('/login', loginService);

module.exports = router;

const express = require('express');
const router = express.Router();
const loginService = require('../services/login-service');

router.post('/login', loginService);
router.get('/room/*', function(req, res) {
  res.status(200).json({test: 'test'})
});

module.exports = router;

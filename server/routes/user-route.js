const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')();

router.post('/user', auth.authenticate(), (req, res) => {
  res.json({success: true});
});

module.exports = router;

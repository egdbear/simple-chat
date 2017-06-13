const jwt = require('jwt-simple');
const config = require('../config.js');
const users = require('../mockdata');

module.exports = (req, res) => {
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;

    const user = users.find(function(u) {
      return u.email === email && u.password === password;
    });

    if (user) {
      const payload = { id: user.id };
      const token = jwt.encode(payload, config.JWTSecret);

      res.json({
          token: token
      });
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
}

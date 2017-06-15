const jwt = require('jwt-simple');
const config = require('../config.js');
const User = require('../models/User');
const _ = require('lodash');

module.exports = (req, res, next) => {
  if (req.body.email && req.body.password) {
    const bodyParams = {email: req.body.email, password: req.body.password };

    User.findOne({email: bodyParams.email}, function(err, user) {
      if (err) {
        res.status(401).json({message: err});
      }

      if (_.isEmpty(user)) {
        res.status(401).json({message: 'Email not founded. Please register.'});
      } else {
        if (err) {
          res.status(401).json({message: err});
        } else {
          user.validatePassword(bodyParams.password, (err, isValid) => {
            if (err) {
              res.status(401);
            }

            const payload = { id: user._id };
            const token = jwt.encode(payload, config.JWTSecret);

            res.json({
                token: token
            });
          });
        }
      }
    });
  } else {
    res.sendStatus(401);
  }
}

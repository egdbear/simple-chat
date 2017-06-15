const jwt = require('jwt-simple');
const config = require('../config.js');
const User = require('../models/User');
const _ = require('lodash');

module.exports = function (req, res, next) {
  if (req.body.email && req.body.password) {
    const bodyParams = {email: req.body.email, password: req.body.password };

    User.findOne({email: bodyParams.email}, function(err, user) {
      if (err) {
        res.status(401).json({message: err});
      }

      if (_.isEmpty(user)) {
        res.status(401).json({message: 'User not registered. Please signup.'});
      } else {
        if (err) {
          res.status(401).json({message: err});
        } else {

          user.validatePassword(bodyParams.password, function(isValid) {

            if (!isValid) {
              return res.status(401).json({message: 'Wrong password.'});
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
    res.status(401).json({message: 'Please type email and password.'});
  }
}

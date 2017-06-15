const User = require('../models/User');
const utils  = require('./utils');

module.exports = function(req, res, next) {
  if (hasParams(req.body)) {
    var bodyParams = {name: req.body.name, email: req.body.email, password: req.body.password };

    if (!isEmailValid(bodyParams.email)) {
      return res.status(401).json({message: 'Please enter a valid email.'})
    }

    if (!isValidPassword(bodyParams.password)) {
      return res.status(401).json({message: 'Make sure your password is more than 8 characters long.'})
    }

		User.findOne({email: req.body.email}, function(err, user) {
			if (err) {
        throw err;
      }

      if (user) {
				res.status(401).json({message: 'User already exists.'})
			} else {
        const addUser = new User(bodyParams);

        addUser.save(bodyParams, function(err, newUser) {
					if (err) {
            throw err;
          }

					res.status(200).json({message: 'Your account has been created.'});
				});
			}
		});
  } else {
    res.status(401).json({message: 'Please fill all fields.'})
  }
};

function isEmailValid(email) {
  if (!utils.validateEmail(email)) {
    return false;
  }

  if (email === '') {
    return false;
  }

  if (email === null) {
    return false;
  }

  return true;
}

function isValidPassword(pass) {
  if (pass.length < 8) {
    return false;
  }

  return true;
}

function hasParams(params) {
  return params.name !== '' && params.email !== '' && params.password !== '';
}

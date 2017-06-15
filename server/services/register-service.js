const User = require('../models/User');

module.exports = (req, res, next) => {
  if (hasParams(req.body)) {
    var bodyParams = {name: req.body.name, email: req.body.email, password: req.body.password };

    if (!isEmailValid(bodyParams.email)) {
      return res.status(401).json({message: 'Please enter a valid email.'})
    }

    if (!isValidPassword(bodyParams.password)) {
      return res.status(401).json({message: 'Make sure your password is more than 8 characters long.'})
    }

		User.findOne({email: req.body.email}, (err, user) => {
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
  if (!validateEmail(email)) {
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

function validateEmail(email) {
    var re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;//eslint-disable-line
    return re.test(email);
}

function hasParams(params) {
  return params.name !== '' && params.email !== '' && params.password !== '';
}

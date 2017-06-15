const User = require('../models/User');

module.exports = (req, res, next) => {

  if (!!req.body) {
    res.status(401);
  }

  var bodyParams = {email: req.body.username, password: req.body.password };

  if (!isEmailValid(bodyParams.email) || !isValidPassword(bodyParams.password)) {
    res.status(401).json({message: 'Please Enter missing fields. Make sure your password is more than 8 characters long.'})
  }

  if (!validateEmail(bodyParams.email)) {
    res.status(401).json({message: 'Please Enter valid email address.'})
  } else {
		User.findOne({email: req.body.username}, (err, user) => {
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
	}
};

function isEmailValid(email) {
  if (email === '') {
    return false;
  }

  if (email === null) {
    return false;
  }

  return true;
}

function isValidPassword(pass) {
  if (isEmailValid(pass)) {
    if (pass.length < 8) {
      return false;
    }
  }

  return true;
}

function validateEmail(email) {
    var re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;//eslint-disable-line
    return re.test(email);
}

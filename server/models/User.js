const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const rounds = 10;

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: String,
  description: String,
  name: String
});

UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(rounds, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) {
        return next(error);
      }

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.validatePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isValid) {
    callback(isValid);
  });
}

var userModel = mongoose.model('User', UserSchema);
module.exports = userModel;

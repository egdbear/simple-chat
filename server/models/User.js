const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String
});

UserSchema.methods.comparePassword = function comparePassword(pass, callback) {
  bcrypt.compare(pass, this.password, callback);
};

UserSchema.pre('save', (next) => {
  const user = this;

  return bcrypt.genSalt((genSaltErr, salt) => {
    if (genSaltErr) {
      return next(genSaltErr);
    }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }

      user.password = hash;

      return next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);

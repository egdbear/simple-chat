const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  passwordHash: String,
  passwordSalt: String

});

module.exports = mongoose.model('User', userSchema);

const User = require('../models/User');

module.exports = () => {
  return User.findAll();
};

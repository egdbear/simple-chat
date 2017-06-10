const userController = require('../controllers');

module.exports = (req, res) => {
  userController();
  res.status(200);
};

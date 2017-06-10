const UserService = require('../services');

module.exports = (app) => {
  app.get('/test', UserService);
}

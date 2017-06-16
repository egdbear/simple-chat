const User = require('../models/User');
const _ = require('lodash');

module.exports = {
  updateProfile: function(req, res) {
    if (!_.isEmpty(req.body._id) && (!_.isEmpty(req.body.email) || !_.isEmpty(req.body.name))) {
      const { email, name } = req.body;
      const newData = { email, name };

      User.findOne({_id: req.body._id}, function(err, user) {
        if (err) {
          return res.sendStatus(401);
        }

        user.save(newData, function(err, newUser) {
          if (err) {
            return res.sendStatus(401).json(err);
          }
          
          res.status(200).json(newUser);
        });
      });
    }
  }
}

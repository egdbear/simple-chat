const passport = require("passport");
const passportJWT = require("passport-jwt");
const config = require("../config.js");

const User = require('../models/User');

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
  secretOrKey: config.JWTSecret,
  jwtFromRequest: ExtractJwt.fromBodyField('jwtSecret')
};

module.exports = function() {
  const strategy = new Strategy(params, (payload, done) => {
      User.findOne({
        _id: payload._id
      }, function(err, user){
        if (user) {
          return done(null, {
            id: user._id
          });
        } else {
          return done(new Error('User not found'), null);
        }
      })
  });

  passport.use(strategy);
  return {
      initialize: function() {
        return passport.initialize();
      },
      authenticate: function() {
        return passport.authenticate('jwt', config.JWTSession);
      }
  };
};

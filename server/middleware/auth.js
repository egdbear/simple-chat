const passport = require("passport");
const passportJWT = require("passport-jwt");
const users = require("../mockdata.js");
const config = require("../config.js");
const _ = require('lodash');

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
  secretOrKey: config.JWTSecret,
  jwtFromRequest: ExtractJwt.fromBodyField('jwtSecret')
};

module.exports = function() {
  const strategy = new Strategy(params, (payload, done) => {
      const user = _.find(users, {id: payload.id})
      if (user) {
        return done(null, {
          id: user.id
        });
      } else {
          return done(new Error('User not found'), null);
      }
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

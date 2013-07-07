var express = require('express');
var configurations = module.exports;
var app = express();
var server = require('http').createServer(app);
var nconf = require('nconf');
var settings = require('./settings')(app, configurations, express);
var passport = require('passport');
var RunkeeperStrategy = require('passport-runkeeper').Strategy;

nconf.argv().env().file({ file: 'local.json' });

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

/* Filters for routes */

var isLoggedIn = function(req, res, next) {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect('/');
  }
};

passport.use(new RunkeeperStrategy({
    clientID: nconf.get('rk_client_id'),
    clientSecret: nconf.get('rk_client_secret'),
    callbackURL: nconf.get('domain') + ':' + nconf.get('authPort') + '/auth/runkeeper/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function (err) {
      if (!profile.access_token) {
        profile.access_token = accessToken;
      }

      return done(err, profile);
    });
  }
));

// routes
require('./routes')(app, nconf, isLoggedIn);
require('./routes/auth')(app, passport);

app.listen(process.env.PORT || nconf.get('port'));

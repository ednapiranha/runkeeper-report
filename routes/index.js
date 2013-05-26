'use strict';

var request = require('request');

var RK_URL = 'https://api.runkeeper.com/';
var TIMEOUT = 10000;

module.exports = function (app, isLoggedIn) {
  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/get_token', isLoggedIn, function (req, res) {
    res.json({ token: req.session.passport.user.access_token });
  });

  app.get('/dashboard', isLoggedIn, function (req, res) {
    res.render('dashboard');
  });
};

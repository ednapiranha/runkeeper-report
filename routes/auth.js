'use strict';

module.exports = function (app, passport) {
  app.get('/auth/runkeeper',
    passport.authenticate('runkeeper'));

  app.get('/auth/runkeeper/callback',
    passport.authenticate('runkeeper', { failureRedirect: '/' }),
    function (req, res) {
      req.session.authenticated = req.isAuthenticated();
      res.redirect('/dashboard');
    }
  );

  app.get('/logout', function (req, res) {
    req.session.destroy();
    res.status(303);
    res.redirect('/');
  });
};

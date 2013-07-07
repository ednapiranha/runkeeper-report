// Module dependencies.
module.exports = function(app, configurations, express) {
  var RedisStore = require('connect-redis')(express);
  var passport = require('passport');
  var nconf = require('nconf');

  nconf.argv().env().file({ file: 'local.json' });

  // Configuration

  app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      app.use(express.logger('dev'));
    }
    app.use(express.static(__dirname + '/public'));
    app.use(express.cookieParser());
    app.use(express.session({
      secret: nconf.get('session_secret'),
      store: new RedisStore({ db: nconf.get('redis_db'), prefix: 'rk' }),
      cookie: { maxAge: 990000000 } // 1 week-ish
    }));
    app.use(function (req, res, next) {
      res.locals.session = req.session.authenticated;
      res.locals.isDebug = nconf.get('debug');
      next();
    });
    app.locals.pretty = true;
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(function (req, res, next) {
      res.status(404);
      res.render('404', { url: req.url, layout: false });
      return;
    });
  });

  app.configure('development', 'test', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  app.configure('prod', 'test', function () {
    app.use(function(req, res, next) {
      res.status(403);
      res.render('403', { url: req.url, layout: false });
      return;
    });
  });

  app.configure('prod', function () {
    app.use(express.errorHandler());
  });

  return app;
};

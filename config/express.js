var config = require('./config'),
        express = require('express'),
        bodyParser = require('body-parser'),
        passport = require('passport'),
        flash = require('connect-flash'),
        session = require('express-session');
        path = require('path');

module.exports = function () {
     var app = express();

     app.use(bodyParser.urlencoded({
          extended: true
     }));

     app.use(bodyParser.json());

     app.use(session({
          saveUninitialized: true,
          resave: true,
          secret: config.sessionSecret
                  /*store: new mongoStore ({
                   db: db.connection.db
                   collection: config.sessionCollection
                   })*/
     }));

     app.set('views', './app/views');
     app.set('view engine', 'jade');

     // Environment dependent middleware
     if (process.env.NODE_ENV === 'development') {
          // Enable logger (morgan)
          /*app.use(morgan('dev'));*/

          // Disable views cache
          app.set('view cache', false);
     } else if (process.env.NODE_ENV === 'production') {
          /*app.locals.cache = 'memory'; */
     }

     // Request body parsing middleware should be above methodOverride
     app.use(bodyParser.urlencoded({
          extended: true
     }));
     app.use(bodyParser.json());

     app.use(flash());
     app.use(passport.initialize());
     app.use(passport.session());

     // Globbing routing files
     config.getGlobbedFiles('./app/routes/**/*.js').forEach(function (routePath) {
          require(path.resolve(routePath))(app);
     });

     app.use(express.static('./public'));

     return app;
};
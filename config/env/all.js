'use strict';

module.exports = {
     app: {
          title: 'The Lindarian Site',
          description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
          keywords: 'MongoDB, Express, AngularJS, Node.js'
     },
     port: process.env.PORT || 8080,
     templateEngine: 'jade',
     sessionSecret: 'MEAN',
     sessionCollection: 'sessions',
     assets: {
          lib: {
               css: [
                    'public/lib/bootstrap/dist/css/bootstrap.css',
                    'public/lib/bootstrap/dist/css/bootstrap-theme.css'
               ],
               js: [
                    'public/lib/angular/angular.js'
               ]
          },
          css: [
               'public/modules/**/css/*.css'
          ],
          js: [
               'public/config.js',
               'public/application.js',
               'public/modules/*/*.js',
               'public/modules/*/*[!tests]*/*.js'
          ],
          tests: [
               'public/modules/*/tests/*.js'
          ]
     }
};

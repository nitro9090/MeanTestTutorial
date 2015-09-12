var users = require('../../app/controllers/users.server.controller'),
        passport = require('passport');

module.exports = function (app) {
     app.route('/register')
             .get(users.renderRegister)
             .post(users.registerNewUser);

     app.route('/login')
             .post(passport.authenticate('local', {
                  successRedirect: '',
                  failureRedirect: '',
                  failureFlash: true
             }));

     app.get('/logout', users.logout);
     
     app.route('/users').post(users.create).get(users.list);

     app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);

     app.param('userId', users.userByID);
}
var User = require('mongoose').model('User'),
        passport = require('passport');

exports.renderRegister = function (req, res, next) {
     if (!req.user) {
          res.render('users/register', {
               messages: req.flash('error')
          });
     }
     else {
          return res.redirect('/');
     }
};

exports.registerNewUser = function (req, res, next) {
     if (!req.user) {
          var user = new User(req.body);
          var message = null;
          user.provider = 'local';
          user.save(function (err) {
               if (err) {
                    var message = getErrorMessage(err);
                    req.flash('error', message);
                    return res.redirect('/register');
               }

               req.login(user, function (err) {
                    if (err)
                         return next(err);

                    return res.redirect('/');
               });
          });
     } else {
          return res.redirect('/');
     }
};

exports.logout = function (req, res) {
     req.logout();
     res.redirect('/');
};

exports.create = function (req, res, next) {
     var user = new User(req.body);
     user.save(function (err) {
          if (err) {
               return next(err);
          } else {
               res.json(user);
          }
     });
};

exports.list = function (req, res, next) {
     User.find({}, function (err, users) {
          if (err) {
               return next(err);
          } else {
               res.json(users);
          }
     });
};

exports.read = function (req, res) {
     res.json(req.user);
};

exports.userByID = function (req, res, next, id) {
     User.findOne({
          _id: id
     },
     function (err, user) {
          if (err) {
               return next(err);
          } else {
               req.user = user;
               next();
          }
     }
     );
};

exports.update = function (req, res, next) {
     User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
          if (err) {
               return next(err);
          } else {
               res.json(user);
          }
     });
};

exports.delete = function (req, res, next) {
     req.user.remove(function (err) {
          if (err) {
               return next(err);
          } else {
               res.json(req.user);
          }
     })
};
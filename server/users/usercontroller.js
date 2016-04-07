var Q = require('q');
var jwt = require('jwt-simple');
var User = require('./usermodel');

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

module.exports = {
  siginin: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    findUser({username: username})
      .then(function(user) {
        if (!user) {
          next(new Error('User does not exist!'));
        } else {
          return user.comparePasswords(password)
            // .then
        }
      })
  }
};
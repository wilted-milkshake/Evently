var User = require('./users/usermodel');
var Event = require('./events/eventmodel');

module.exports = {

  findAllEvents: function(callback) {
    Event.find({}, function(err, events) {
      if (err) {
        console.log('ERROR', err);
      } else {
        callback(events);
      }
    })
  },

  isLoggedIn: function(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
  },

  findUserByUsernameMiddleware: function(request, response, next) {
    if (request.params.username) {
      findUserByUsername(request.params.username, function(error, user){
        if (error) return next(error);
        request.user = user;
        return next();
      });
    } else {
      return next();
    }
  },
  findUserByUsername: findUserByUsername
};

function findUserByUsername(username, callback) {
  // Perform database query that calls callback when it's done
  // This is our fake database!
  User.findOne({'local.username': username}, callback);
}

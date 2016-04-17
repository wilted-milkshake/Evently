var User = require('./users/usermodel');
var Event = require('./events/eventmodel');

function findAllEvents(callback) {
  Event.find({}, function(err, events) {
    if (err) {
      console.log('ERROR', err);
    } else {
      callback(events);
    }
  })
}

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/');
}

function findUserByUsernameMiddleware(request, response, next) {
  if (request.params.username) {
    findUserByUsername(request.params.username, function(error, user){
      if (error) return next(error);
      request.user = user;
      return next();
    });
  } else {
    return next();
  }
}

function createEvent(newEvent) {
  return Event.create(newEvent)
  .then(event => addEventToUser(event.coordinator[0], event))
  .catch(err => console.log(err));
}

function addLocation(id, location, cb) {
  Event.findByIdAndUpdate(id, {$push: {locations: location}}, {new: true}, cb);
}

function getEventTitles(eventIds) {
  return Event.find({_id: {$in: eventIds}})
    .then(events => events.map(e => ({title: e.title, url: e.url})))
    .catch(err => console.log(err));
}


function findUserByUsername(username, callback) {
  // Perform database query that calls callback when it's done
  // This is our fake database!
  User.findOne({'local.username': username}, callback);
}

function addUserToEvent(user, event) {
  return Event.findOneAndUpdate(
    {url: event},
    {$push: {guests: user}},
    {new: true}
  );
}

function addEventToUser(user, event) {
  return User.findOneAndUpdate(
    {'local.username': user},
    {$push: {'events': event._id}},
    {new: true}
  );
}




module.exports = {
  findUserByUsername: findUserByUsername,
  findUserByUsernameMiddleware: findUserByUsernameMiddleware,
  addLocation: addLocation,
  getEventTitles: getEventTitles,
  createEvent:createEvent,
  isLoggedIn: isLoggedIn,
  findAllEvents: findAllEvents,
  addUserToEvent: addUserToEvent,
  addEventToUser: addEventToUser,
};

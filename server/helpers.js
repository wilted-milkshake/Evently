var User = require('./users/usermodel');
var Event = require('./events/eventmodel');

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/');
}

function findUserByUsername(username, callback) {
  // Perform database query that calls callback when it's done
  // This is our fake database!
  User.findOne({ 'local.username': username }, callback);
}

function findEventByUrl(url) {
  return Event.findOne({ url: url });
}

function findUserByUsernameMiddleware(request, response, next) {
  if (request.params.username) {
    findUserByUsername(request.params.username, (error, user) => {
      if (error) return next(error);
      request.user = user;
      return next();
    });
  }
  return next();
}

function addUserToEvent(user, event) {
  return Event.findOneAndUpdate(
    { url: event },
    { $addToSet: { guests: user } },
    { new: true }
  );
}

function addEventToUser(user, event) {
  return User.findOneAndUpdate(
    { 'local.username': user },
    { $addToSet: { events: event._id } },
    { new: true }
  );
}

function createEvent(newEvent) {
  return Event.create(newEvent)
  .then(event => addEventToUser(event.coordinator[0], event))
  .catch(err => console.log(err));
}

function addLocation(id, location, cb) {
  Event.findByIdAndUpdate(
    id,
    { $push: { locations: location } },
    { new: true },
    cb
  );
}

function getEventTitles(eventIds) {
  return Event.find({ _id: { $in: eventIds } })
    .then(events => events.map(e => ({ title: e.title, url: e.url })))
    .catch(err => console.log(err));
}

function removeUserFromEvent(user, event) {
  return Event.findOneAndUpdate(
    { url: event },
    { $pull: { guests: user } },
    { new: true }
  );
}

function removeEventFromUser(user, event) {
  return User.findOneAndUpdate(
    { 'local.username': user },
    { $pull: { events: event._id } },
    { new: true }
  );
}

function addChatToEvent(chat, event) {
  return Event.findOneAndUpdate(
    { url: event },
    { $push: { chats: chat } },
    { new: true }
  );
}

function removeLocation(id, event) {
  return Event.findOne({'url': event}).exec((err, event) => {
    var newLocationsArr = [];
    for (var i=0; i<event.locations.length; i++) {
      if (event.locations[i]._id != id) {
        newLocationsArr.push(event.locations[i]);
      }
    }
    event.locations = newLocationsArr;
    event.save();
  });
}

function updateLocation(id, updates, event) {
  return Event.findOne({'url': event}).exec((err, event) => {
    var newLocationsArr = [];
    for (var i=0; i<event.locations.length; i++) {
      if (event.locations[i]._id == id) {
        event.locations[i].description = updates.description;
        event.locations[i].time = updates.time;
      }
      newLocationsArr.push(event.locations[i]);
    }
    event.locations = newLocationsArr;
    event.save();
  });
}

module.exports = {
  findUserByUsername,
  findUserByUsernameMiddleware,
  addLocation,
  getEventTitles,
  createEvent,
  isLoggedIn,
  addUserToEvent,
  addEventToUser,
  removeUserFromEvent,
  removeEventFromUser,
  addChatToEvent,
  findEventByUrl,
  updateLocation,
  removeLocation,
};

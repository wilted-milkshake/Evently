var Q = require('q');
var path = require('path');
var Event = require('./eventmodel');
var User = require('./../users/usermodel');

var addEvent = Q.nbind(Event.create, Event);
var findEvent = Q.nbind(Event.findOne, Event);
var updateUser = Q.nbind(User.findOneAndUpdate, User);

module.exports = {
  // insert event info into Event table and User table
  createEvent: function(req, res, next) {
    var newEvent = {
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      guests: [req.body.coordinator],
      coordinator: req.body.coordinator,
      locations: req.body.locations, 
      chats: []
    };

    addEvent(newEvent)
    .then(function(addedNewEvent) {
      res.json(addedNewEvent);
    })
    .catch(function(error) {
      res.json(error);
    });

  },

  joinEvent: function(req, res, next) {
    var user = req.body;
    console.log('USER IN EVENT CONTROLLER', user)

    // find event based on user.title
    findEvent({title: user.title}).then(function(foundEvent) {
      console.log('FOUND EVENT', foundEvent);
    });
    // find user based on user.username

    // add that event to user's event array

    // updateUser(user)
    // .then(function(err, user) {
    //   console.log('USER IN JOIN EVENT', user);
    //   res.json(user);
    // })
  },

  addLocation: function(id, location, cb) {
    Event.findByIdAndUpdate(id, {$push: {locations: location}}, {new: true}, cb);
  },

  displayEvent: function(req, res, next) {}
}
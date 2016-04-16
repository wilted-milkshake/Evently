var Q = require('q');
var path = require('path');
var Event = require('./eventmodel');
var User = require('./../users/usermodel');
var helper = require('./../helpers');

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

    findEvent({title: user.title}).then(function(foundEvent) {
      foundEvent.guests = foundEvent.guests.concat(user.username);
      return foundEvent;
    }).then(function(foundEvent) {
      console.log('FOUND EVENT', foundEvent);
      helper.findUserByUsername(user.username, function(err, user) {
        user.events = user.events.concat(foundEvent);
        res.json(user);
      });
    });
  },

  addLocation: function(id, location, cb) {
    Event.findByIdAndUpdate(id, {$push: {locations: location}}, {new: true}, cb);
  },

  displayEvent: function(req, res, next) {}
}
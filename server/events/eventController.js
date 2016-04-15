var Q = require('q');
var path = require('path');
// var User = require('./usermodel');
// var Event = require(path.resolve('./eventmodel'));
var Event = require('./eventmodel');
var User = require('./../users/usermodel');

var addEvent = Q.nbind(Event.create, Event);
var updateUser = Q.nbind(User.findOneAndUpdate, User);

// var findUser = Q.nbind(User.findOne, User);
// var createUser = Q.nbind(User.create, User);

module.exports = {
  // insert event info into Event table and User table
  createEvent: function(req, res, next) {
    
    console.log('createEvent location: ', req.body.locations);
    
    var newEvent = {
      title: req.body.title,
      date: req.body.date,
      coordinator: '',
      description: '',
      guests: [],
      locations: req.body.locations, 
      chats: []
    };

    addEvent(newEvent)
    .then(function(addedNewEvent) {
      console.log("addedNewEvent: ", addedNewEvent);
      res.json(addedNewEvent);
    })
    .catch(function(error) {
      res.json(error);
    });

  },

  joinEvent: function(req, res, next) {},

  addLocation: function(id, location, cb) {
    Event.findByIdAndUpdate(id, {$push: {locations: location}}, {new: true}, cb);
  },

  displayEvent: function(req, res, next) {}

};
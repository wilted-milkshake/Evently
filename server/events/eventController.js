var Q = require('q');
var helpers = require('.././helpers.js')
var path = require('path');
// var User = require('./userModel');
// var Event = require(path.resolve('./eventModel'));
var Event = require('./eventModel');
var addNew = Q.nbind(Event.create, Event);
// var findUser = Q.nbind(User.findOne, User);
// var createUser = Q.nbind(User.create, User);

module.exports = {

  // insert event info into Event table and User table
  createEvent: function(req, res, next) {
    
    console.log('createEvent req.body: ', req.body);
    
    var newEvent = {
      name: req.body.eventname,
      date: req.body.date,
      cooridator: '',
      locations: [], 
      guest: []
    };

    addNew(newEvent)
    .then(function(addedNewEvent) {
      console.log("addedNewEvent: ", addedNewEvent);
      res.json(addedNewEvent);
    });


  },

  joinEvent: function(req, res, next) {},

  displayEvent: function(req, res, next) {}

};
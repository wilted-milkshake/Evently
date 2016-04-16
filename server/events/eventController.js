var Q = require('q');
var path = require('path');
var Event = require('./eventmodel');
var User = require('./../users/usermodel');

var addEvent = Q.nbind(Event.create, Event);
var updateUser = Q.nbind(User.findOneAndUpdate, User);

module.exports = {
  // insert event info into Event table and User table


  joinEvent: function(req, res, next) {},

  
  displayEvent: function(req, res, next) {}

};

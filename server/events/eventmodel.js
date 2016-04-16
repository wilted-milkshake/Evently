var mongoose = require('mongoose');
var User = require('../users/usermodel');

var EventSchema = new mongoose.Schema({
  url: String,
  title: String,
  date: Date,
  coordinator: [],
  description: String,
  guests: [],
  locations: [],
  chats: []
});

var eventModel = mongoose.model('events', EventSchema);

module.exports = eventModel;

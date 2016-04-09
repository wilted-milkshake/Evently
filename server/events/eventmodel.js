var mongoose = require('mongoose');
var User = require('../users/usermodel');

var EventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  coordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  locations: [],
  guests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var eventModel = mongoose.model('events', EventSchema);

module.exports = eventModel;
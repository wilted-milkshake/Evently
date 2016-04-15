var mongoose = require('mongoose');
var User = require('../users/usermodel');

var EventSchema = new mongoose.Schema({
  url: String,
  title: String,
  date: Date,
  coordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  guests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  locations: [],
  chats: []
});

var eventModel = mongoose.model('events', EventSchema);

module.exports = eventModel;
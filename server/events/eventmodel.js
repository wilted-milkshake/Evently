var mongoose = require('mongoose');
var User = require('../users/usermodel');

var EventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  coordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  locations: [
    {
      name: String,
      address: String,
      latitude: Number,
      longitude: Number,
      time: Date
    }
  ],
  guests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]

});
console.trace('Called this')

var eventModel = mongoose.model('events', EventSchema);

module.exports = eventModel;
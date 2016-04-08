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
      lat: Number,
      long: Number,
      time: Date
    }
  ],
  guests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]

});

module.exports = mongoose.model('events', EventSchema);
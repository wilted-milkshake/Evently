var mongoose = require('mongoose');
var User = require('../users/usermodel');
var Location = require('../locations/locationmodel');

var EventSchema = new mongoose.Schema({
  name: String,
  coordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  }]

});

module.exports = mongoose.model('events', EventSchema);
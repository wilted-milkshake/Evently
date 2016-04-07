var mongoose = require('mongoose');
var User = require('./usermodel');
var Location = require('./locationmodel');

var EventSchema = new mongoose.Schema({
  name: String,
  coordinator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'Location'
  }]

});

module.exports = mongoose.model('events', EventSchema);
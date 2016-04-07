var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  long: Number,
  date: Date,
  time: Date,
  address: String
});

module.exports = mongoose.model('locations', LocationSchema);
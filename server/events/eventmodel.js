const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('../users/usermodel');

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


var createSha = function (eventid) {
  var shasum = crypto.createHash('sha1');
  shasum.update(eventid);
  return shasum.digest('hex').slice(0, 8);
};

EventSchema.pre('save', function (next) {
  var url = createSha(`${this.title}${this.desctiption}${this.date}`);
  this.url = url;
  next();
});

var eventModel = mongoose.model('events', EventSchema);

module.exports = eventModel;

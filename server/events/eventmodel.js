const mongoose = require('mongoose');
const crypto = require('crypto');

const EventSchema = new mongoose.Schema({
  url: String,
  title: String,
  date: Date,
  coordinator: [],
  description: String,
  guests: [],
  locations: [{
    title: String,
    address: String,
    description: String,
    time: String,
    lat: Number,
    lng: Number,
  }],
  chats: [
    {
      author: String,
      message: String,
      timestamp: Date,
    },
  ],
});

const createSha = function (eventid) {
  const shasum = crypto.createHash('sha1');
  shasum.update(eventid);
  return shasum.digest('hex').slice(0, 8);
};

EventSchema.pre('save', function (next) {
  const url = createSha(`${this.title}${this.desctiption}${this.date}`);
  this.url = url;
  next();
});

const eventModel = mongoose.model('events', EventSchema);

module.exports = eventModel;

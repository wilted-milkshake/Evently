const helpers = require('../helpers');
const dummyData = require('./dummydata.js');

module.exports = function socketConfig(io) {
  io.on('connection', (socket) => {
    const event = socket.handshake['query']['eventRoom'];

    function broadcastEventData(eventData) {
      io.to(event).emit('event data', eventData);
    }

    socket.join(event);
    socket.emit('event data', dummyData);

    socket.on('fetch data', () => {
      socket.emit('event data', dummyData);
    });

    // socket.on('chat message', )

    socket.on('new marker added', function(marker) {
      helpers.addLocation(marker.id, marker.location, function(err, eventData) {
        broadcastEventData(eventData);
      });
    });

    socket.on('join event', user => {
      helpers.addUserToEvent(user, event)
      .then(eventData => {
        broadcastEventData(eventData);
        return helpers.addEventToUser(user, eventData);
      })
      .then(userData => helpers.getEventTitles(userData.events))
      .then(eventTitles => socket.emit('update profile', eventTitles));
    });

    socket.on('leave event', user => {
      helpers.removeUserFromEvent(user, event)
      .then(broadcastEventData);
    });
  });
};

const helpers = require('../helpers');
const dummyData = require('./dummydata.js');

module.exports = function socketConfig(io) {
  io.on('connection', (socket) => {
    const event = socket.handshake['query']['eventRoom'];

    function broadcastEventData(eventData) {
      io.to(event).emit('event data', eventData);
    }

    socket.join(event);

    socket.on('fetch data', (event) => {
      helpers.findEventByUrl(event)
      .then(eventData => {
        console.log(eventData);
        socket.emit('event data', eventData);
      });
    });

    socket.on('new chat', chat => {
      helpers.addChatToEvent(chat, event)
      .then(eventData => {
        broadcastEventData(eventData);
      });
    });

    socket.on('new marker added', (marker) => {
      console.log('MARKER IN SOCKET', marker);
      helpers.addLocation(marker.id, marker.marker, (err, eventData) => {
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
      .then(eventData => {
        broadcastEventData(eventData);
        return helpers.removeEventFromUser(user, eventData);
      })
      .then(userData => helpers.getEventTitles(userData.events))
      .then(eventTitles => socket.emit('update profile', eventTitles));
    });
  });
};

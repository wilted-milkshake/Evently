const helpers = require('../helpers');

module.exports = function socketConfig(io) {
  io.on('connection', (socket) => {

    function broadcastEventData(eventData, event) {
      io.to(event).emit('event data', eventData);
    }

    socket.on('join room', event => socket.join(event));

    socket.on('fetch data', (event) => {
      helpers.findEventByUrl(event)
      .then(eventData => socket.emit('event data', eventData));
    });

    socket.on('new chat', chatData => {
      helpers.addChatToEvent(chatData.chat, chatData.event)
      .then(eventData => broadcastEventData(eventData, chatData.event));
    });

    socket.on('event updated', location => {
      helpers.updateLocation(location.id, location.updates, location.event)
        .then(eventData => broadcastEventData(eventData, location.event));
    });

    socket.on('remove loc', location => {
      helpers.removeLocation(location.id, location.event)
        .then(eventData => broadcastEventData(eventData, location.event));
    });

    socket.on('new marker added', (markerData) => {
      helpers.addLocation(markerData.id, markerData.marker, (err, eventData) => {
        broadcastEventData(eventData, markerData.event);
      });
    });

    socket.on('join event', (user, event) => {
      helpers.addUserToEvent(user, event)
      .then(eventData => {
        broadcastEventData(eventData, event);
        return helpers.addEventToUser(user, eventData);
      })
      .then(userData => helpers.getEventTitles(userData.events))
      .then(eventTitles => socket.emit('update profile', eventTitles));
    });

    socket.on('leave event', (user, event) => {
      helpers.removeUserFromEvent(user, event)
      .then(eventData => {
        broadcastEventData(eventData, event);
        return helpers.removeEventFromUser(user, eventData);
      })
      .then(userData => helpers.getEventTitles(userData.events))
      .then(eventTitles => socket.emit('update profile', eventTitles));
    });
  });
};

var io = require('socket.io-client');

const SocketConnection = {

  initialize(eventID) {
    return io.connect(window.location.origin, {
      query: 'eventRoom=' + eventID
    });
  },

  configListeners(socket) {
  }
};

export default SocketConnection;

var dummyData = {
  url: '/api/events/abc',
  itinerary: [
    {
      time: '1:45 pm',
      location: 'here changed'
    },
    {
      time: '2:00 pm',
      location: 'a little bit away from here over there'
    },
    {
      time: '3:00 pm',
      location: 'super far away and also chaged'
    }
  ],
  locations: [{lat: -34.397, lng: 150.644, name: 'bazongaville'}],
  chats: [],
  coordinator: '570e929579611d792f533e91'
};

module.exports = function socketConfig(io) {
  io.on('connection', function(socket) {
    var event = socket.handshake['query']['eventRoom'];

    socket.join(event);
    socket.emit('event data', dummyData);
    socket.on('fetch data', function() {
      console.log('heard fetch from: ', socket);
      socket.emit('event data', dummyData);
    });
    // socket.on('chat message', )
  });
};

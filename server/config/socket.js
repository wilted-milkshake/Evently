const dummyData = {
  url: '/api/events/abc',
  name: 'event name',
  itinerary: [
    {
      time: '1:45 pm',
      location: 'here changed bloop',
    },
    {
      time: '2:00 pm',
      location: 'a little bit away from here over there',
    },
    {
      time: '3:00 pm',
      location: 'super far away and also chaged',
    },
  ],
  locations: [{ lat: -34.397, lng: 150.644, name: 'bazongaville' }],
  chats: [
    {
      author: 'me',
      text: 'this is my message',
    },
    {
      author: 'you',
      text: 'i talk pretty good',
    },
    {
      author: 'no one',
      text: 'who am i',
    },
  ],
  coordinator: '570e929579611d792f533e91',
  guests: ['poo', 'foo', 'abc', '123', 'michael jackson'],
};

module.exports = function socketConfig(io) {
  io.on('connection', (socket) => {
    const event = socket.handshake['query']['eventRoom'];

    socket.join(event);
    socket.emit('event data', dummyData);

    socket.on('fetch data', () => {
      socket.emit('event data', dummyData);
    });
    // socket.on('chat message', )
  });
};

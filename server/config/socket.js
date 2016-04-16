const EventController = require('../events/eventController');

const dummyData = {
  url: '/api/events/abc',
  title: 'event name',
  date: null,
  coordinator: ['570e929579611d792f533e91'],
  description: '',
  guests: ['poo', 'foo', 'abc', '123', 'michael jackson'],
  locations: [
    {
      title: 'bazongaville', 
      address: '',
      description: 'hey everybody!!! we\'re pooping!!!!',
      time: '1:45pm',
      lat: -34.45,
      lng: 123
    },
    {
      title: 'poop 2', 
      address: '',
      description: 'we\'re pooping here too!!!!',
      time: '2:45pm',
      lat: -44.7,
      lng: 123.35
    },
    {
      title: 'poop 3', 
      address: '',
      description: 'and here!!!',
      time: '2:48pm',
      lat: 4.1,
      lng: 42.4
    }
  ],
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
    }
  ]
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
    socket.on('new marker added', function(marker) {
      EventController.addLocation(marker.id, marker.location, function(err, event) {
        io.emit('event data', event);
      })
    })
  });
};

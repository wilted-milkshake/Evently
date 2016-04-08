var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var mongoose = require('mongoose');

var User = require('./users/usermodel');
var Event = require('./events/eventmodel');

var app = express();

app.use(express.static(__dirname + '/../client'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/milkshake');

var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'Error on mongo connection'));

// db.once('open', function(cb) {
//   console.log("Mongo db connected to server");

//   var user = new User({username: 'Phillip', password: 'blah'});

//   user.save(function(err, user) {
//     if (err) {
//       return console.error(err);
//     } else {
//       console.log('User ' + user + ' saved to db');
//     }
//   });

//   var location = new Location({
//     name: 'Stockton!!',
//     lat: 37.776402,
//     long: -122.408342,
//     date: Date.now(),
//     time: Date.now(),
//     address: '663 Fake Address, Fake City, CA'
//   });

//   location.save(function(err, loc) {
//     if (err) {
//       return console.error(err);
//     } else {
//       console.log('Location ' + loc + ' saved to db');
//       var newLoc = [];
//       newLoc.push(location);
//       var event = new Event({
//         name: 'Milkshake Event!',
//         coordinator: user,
//         locations: newLoc
//       });

//       event.save(function(err, event) {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log('Event ' + event + ' saved to db');
//         }
//       })
//     }
//   });


  // db.users.remove({username: 'Phillip'});
  
});


app.listen(3000, function() {
  console.log('Listening on port 3000');
});

module.exports = app;
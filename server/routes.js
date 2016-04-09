// dependencies
var userController = require('./users/userController.js');
var eventController = require('./events/eventController.js');


var someFunc = function() {};

module.exports = function(app, express) {
  app.post('/users/signup', userController.signup); // insert username, password into Users table 
  app.post('/users/signin', userController.signin); 
  app.get('/api/users/signedin', userController.checkAuth);

  app.get('/users', someFunc); // get event list from Users table

  app.post('/events/create', eventController.createEvent); // insert event info into Event table and User table
  app.post('/events/join', someFunc); // insert event info into Event table and User table

  app.get('/events', someFunc); // get event info from Events table
}
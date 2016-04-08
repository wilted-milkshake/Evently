// dependencies
// var userController = require('./users/userController.js');

var someFunc = function() {};

module.exports = function(app, express) {
  app.post('/users/signup', someFunc);
  app.get('/users/login', someFunc);
  app.get('/users', someFunc);
  app.post('events/create', someFunc);
  app.post('events/join', someFunc);
  app.get('events', someFunc);

}
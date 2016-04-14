var helper = require('./helpers.js');
var eventController = require('./events/eventController.js');
module.exports = function(app, passport) {
  // home page with login links
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  // show the login form
  app.get('/login', function(req, res) {
    // var user = User.find({_id: 'ObjectId("570ac3dcdc4476821277d008")'})
    // console.log('USRRRRR', user );
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
      failureRedirect: '/login',
      failureFlash: true
    }), function(req, res) {
      res.redirect('/events');
  });

  // show the signup form
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }), function(req, res) {
      res.redirect('/events');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/events/create', eventController.createEvent); // insert event info into Event table and User table

};

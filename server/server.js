var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var dbConfig = require('./config/database');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var helper = require('./helpers.js');
var port = process.env.PORT || 3000;

var app = express();

mongoose.connect(dbConfig.url);

require('./config/passport')(passport);

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes
require('./routes-passport')(app, passport); // load our routes and pass in our app and fully configured passport

app.use(express.static(__dirname + '/../client'));

app.get('/api/events/users', function(req, res) {
  res.send(req.user)
})

app.get('/api/events/', helper.findUserByUsernameMiddleware && helper.isLoggedIn, function(req, res, next) {
  res.params = req.user;
  next();
});

app.get('/api/events/', helper.findUserByUsernameMiddleware && helper.isLoggedIn, function(req, res) {
  console.log('USERRRRRR in server.js', req.params);
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});


app.listen(port, function() {
  console.log('Listening on port ' + port);
});
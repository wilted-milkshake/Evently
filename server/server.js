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
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// set up socket listerner
require('./config/socket')(io);

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



app.use(express.static(__dirname + '/../dist'));

app.get('/api/users', function(req, res) {
  helper.findUserByUsername(req.user.username, function(err, user) {
    if (err) {
      console.log(err);
    }
    res.send(user);
  });
});

app.get('/events', helper.findUserByUsernameMiddleware && helper.isLoggedIn, function(req, res) {
  // console.log('USERRRRRR in server.js', req.user);
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

server.listen(port, function() {
  console.log('Listening on port ' + port);
});

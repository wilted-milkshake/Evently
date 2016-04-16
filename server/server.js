const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const dbConfig = require('./config/database');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helper = require('./helpers.js');
const port = process.env.PORT || 3000;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
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
// load our routes and pass in our app and fully configured passport
require('./routes-passport')(app, passport);


app.use(express.static(`${__dirname}/../dist`));

app.get('/api/users', (req, res) => {
  helper.findUserByUsername(req.user.local.username, (err, user) => {
    if (err) {
      console.log(err);
    }
    helper.getEventTitles(user.events)
    .then(eventTitles => {
      user.events = eventTitles;
      res.send(user);
    });
  });
});

app.post('/api/events', (req, res) => {
  helper.createEvent(req.body)
  .then(user => helper.getEventTitles(user.events))
  .then(eventTitles => res.send(eventTitles));
});

app.get('/*', helper.findUserByUsernameMiddleware && helper.isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

server.listen(port, () => console.log(`Listening on port ${port}`));

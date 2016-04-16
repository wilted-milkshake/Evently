const helpers = require('./helpers.js');
const path = require('path');
const express = require('express');

module.exports = (app, passport) => {
  // home page with login links
  app.get('/', (req, res) => res.render('index.ejs'));

  // show the login form
  app.get('/login', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login',
    {
      failureRedirect: '/login',
      failureFlash: true,
    }),
    (req, res) => res.redirect('/events')
  );

  // show the signup form
  app.get('/signup', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup',
    {
      failureRedirect: '/signup', // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    }),
    (req, res) => res.redirect('/events')
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.use(express.static(`${__dirname}/../dist`));


  app.get('/api/users', (req, res) => {
    helpers.findUserByUsername(req.user.local.username, (err, user) => {
      if (err) {
        console.log(err);
      }
      helpers.getEventTitles(user.events)
      .then(eventTitles => {
        user.events = eventTitles;
        res.send(user);
      });
    });
  });

  app.post('/api/events', (req, res) => {
    helpers.createEvent(req.body)
    .then(user => helpers.getEventTitles(user.events))
    .then(eventTitles => res.send(eventTitles));
  });

  app.get('/*', helpers.findUserByUsernameMiddleware && helpers.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
  });
};

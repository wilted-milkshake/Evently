var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});

require('./routes.js')(app, express);

mongoose.connect('mongodb://localhost/milkshake');

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

module.exports = app;



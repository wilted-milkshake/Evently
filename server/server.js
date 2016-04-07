var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var app = express();

app.use(express.static(__dirname + '/../client'));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/milkshake');


app.listen(3000, function() {
  console.log('Listening on port 3000');
});

module.exports = app;
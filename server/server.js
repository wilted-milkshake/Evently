var express = require('express');

var app = express();

app.use(express.static(__dirname + '/../client'));

app.get('/', function(req, res) {
  res.send('index');
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    return console.error(err);
  } else {
    console.log("Listening on port 3000");
  }
});


var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  React.createElement('h1', null, 'Hello World!'),
  // <h1>'Hello World'</h1>,
  document.getElementById('example')
);
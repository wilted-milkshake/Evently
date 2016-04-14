import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import UserProfile from './components/users/UserProfile.js';
import EventPage from './components/events/EventPage.js';
import AddEventForm from './components/users/AddEventForm.js';

require('./styles/styles.css');
// require('socket.io-client');

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div id="sidebar">
          <UserProfile />
          <Link to="/events/hahaha">Testing</Link>
        </div>
        <div id="header">
          <h1 className="header">Evently.io</h1>
        </div>
        <div id="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/events" component={App}>
      <IndexRoute component={AddEventForm} />
      <Route path='/events/:eventName' component={EventPage} />
    </Route>
  </Router>,
  document.getElementById('app')
);

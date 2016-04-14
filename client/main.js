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
    this.state = {
      username: '',
      events: []
    }
  }

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile() {
    $.ajax({
      type: 'GET',
      url: '/api/users',
      dataType: 'json',
      success: function(data) {
        this.setState({
          username: data.local.username,
          events: data.events
        });
      }.bind(this),
      fail: function(err) {
        console.error(err);
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div id="sidebar">
          <UserProfile {...this.state}/>
        </div>
        <div id="header">
          <h1 className="header">Evently.io</h1>
        </div>
        <div id="content">
          {React.cloneElement(this.props.children, {user: this.state.username})}
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

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import UserProfile from './components/users/UserProfile.js';
import EventPage from './components/events/EventPage.js';
import AddEventForm from './components/users/AddEventForm.js';

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
    $(".button-collapse").sideNav();
  }

  onAddEvent(newEvent) {
    var newEvents = this.state.events.concat(newEvent);
    this.setState({
      events: newEvents
    });
  }

  onJoinEvent() {
    // we want to add event to users event list
    // $.ajax({
    //   type: 'POST',
    //   url: '/events/join',
    //   data: ,
    //   success: function(user) {
    //     console.log('ONJOIN EVENT', user)
    //   }.bind(this),
    //   fail: function(err) {
    //     console.error(err);
    //   }
    // });
  }

  fetchProfile() {
      $.ajax({
        type: 'GET',
        url: '/api/users',
        dataType: 'json',
        success: function(data) {
          this.setState({
            userID: data._id,
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
      <div>
        <header>
          <div className="container">
            <a href="#" data-activates="slide-out" className="button-collapse top-nav full hide-on-large-only"><i className="material-icons">menu</i></a>
          </div>
          <div id="slide-out" className="side-nav fixed">
            <UserProfile {...this.state} />
          </div>
        </header>
        <main>
          <section id="header">
            <div className="container">
              <h1>Evently.io</h1>
            </div>
          </section>
          <section className="event-content">
            <div className="container">
              {React.cloneElement(this.props.children, {
                user: this.state.username,
                userID: this.state.userID,
                onAddEvent: this.onAddEvent.bind(this),
                onJoinEvent: this.onJoinEvent.bind(this),
                events: this.state.events,
              })}
            </div>
          </section>
        </main>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/events" component={App}>
      <IndexRoute component={AddEventForm} />
      <Route path="/events/:eventName" component={EventPage} />
    </Route>
  </Router>,
  document.getElementById('app')
);

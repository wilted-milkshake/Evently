import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import UserProfile from './components/users/UserProfile.js';
import EventPage from './components/events/EventPage.js';
import AddEventForm from './components/users/AddEventForm.js';

require('./styles/styles.css');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      events: [],
      socket: null,
    };
  }
  componentWillMount() {
    this.setState({
      socket: io.connect(window.location.origin),
    });
  }
  componentDidMount() {
    this.fetchProfile();
    $(".button-collapse").sideNav();
  }

  onAddEvent(events) {
    this.setState({
      events,
    });
  }

  fetchProfile() {
    $.ajax({
      type: 'GET',
      url: '/api/users',
      dataType: 'json',
      success: (data) => {
        this.setState({
          userID: data._id,
          username: data.local.username,
          events: data.events,
        });
      },
      fail(err) {
        console.error(err);
      },
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
          <section className="event-content">
            <div className="container">
              {React.cloneElement(this.props.children, {
                user: this.state.username,
                userID: this.state.userID,
                onAddEvent: this.onAddEvent.bind(this),
                socket: this.state.socket,
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

App.propTypes = {
  children: React.PropTypes.object,
};

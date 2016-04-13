import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import UserProfile from './components/users/UserProfile.js';
import EventPage from './components/events/EventPage.js';
import AddEventForm from './components/users/AddEventForm.js';

require('./styles/styles.css');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Megan',
      events: [
        {
          title: 'Bonfire Party',
          date: new Date("September 3, 2016"),
          coordinator: 'Megan',
          locations: [
            {
              name: 'Ocean Beach',
              time: '1:00 pm',
              address: '449 Powell St, San Francisco, CA 94108'
            }
          ]
        }
      ],
      event: {
        url: '/api/events/abc',
        itinerary: [
          {
            time: '1:45 pm',
            location: 'here'
          },
          {
            time: '2:00 pm',
            location: 'a little bit away from here'
          },
          {
            time: '3:00 pm',
            location: 'super far away'
          }
        ],
        location: {lat: -34.397, lng: 150.644},
        chats: []
      }
    }
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/api/events',
      dataType: 'json',
      success: function(data) {
        this.setState({
          username: data.local.username
        });
      }.bind(this)
    });


  }

  connectSocket(eventID) {
    this.setState({
      socket: SocketConnection(eventID)
    });

    this.state.socket.on('event data', data => this.setState({event: data}));
  }.bind(this)

  render() {
    const {
      events,
      event,
      username
    } = this.state;
    return (
      <div className="container">
        <div id="sidebar">
          <UserProfile username={username} events={events} />
        </div>
        <div id="header">
          <h1 className="header">Evently.io</h1>
        </div>
        <div id="content">
          <AddEventForm />
          {/*<EventPage event={event} />*/}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

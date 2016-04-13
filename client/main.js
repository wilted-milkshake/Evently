import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import UserProfile from './components/users/UserProfile.js';
import EventPage from './components/events/EventPage.js';
import SocketConnection from './socket.js';
import $ from 'jquery';

require('./styles/styles.css');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Megan',
      events: [],
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
        console.log('HI');
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
          <h1>Evently.io</h1>
        </div>
        <div id="content">
          <EventPage event={event} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
    <Route path='/events' component={App}>
    </Route>
  </Router>,
  document.getElementById('app')
);


/*

*/

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       events: [
//         {
//           title: 'Bonfire Partys',
//           date: new Date(),
//           time: '1:00pm',
//           Coordinator: 'Megan'
//         },
//         {
//           title: 'Christmas Party',
//           date: new Date(),
//           time: '1:00pm',
//           Coordinator: 'Allison'
//         }
//       ],
//       event: {
//         url: '/api/events/abc',
//         itinerary: [
//           {
//             time: '1:45 pm',
//             location: 'here'
//           },
//           {
//             time: '2:00 pm',
//             location: 'a little bit away from here'
//           },
//           {
//             time: '3:00 pm',
//             location: 'super far away'
//           }
//         ],
//         location: {lat: -34.397, lng: 150.644},
//         chats: []
//       }
//     };
//   }

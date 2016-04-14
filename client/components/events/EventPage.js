import React from 'react';
import Map from './Map.js';
import Itinerary from './Itinerary.js';

export default class EventPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: undefined,
      event: {
        url: '',
        name: '',
        itinerary: [],
        location: {lat: 0, lng: 0},
        chats: []
      }
    }
  }

  componentWillMount() {
    this.setState({
      socket: this.configSocket(this.props.params.eventName)
    })
  }

  componentDidMount() {
    this.state.socket.emit('fetch data');
  }

  configSocket(eventID) {
    let socket = io.connect(window.location.origin, {
      query: 'eventRoom=' + eventID
    });
    socket.on('event data', data => this.setState({event: data}));
    return socket;
  }

  render() {
    return (
      <div>
        <h2>Your Super Awesome Event</h2>
        <h2>{this.state.event.name}</h2>
        <h3>{this.props.user}</h3>
        <div id="map" style={{width: '600px', height:'450px'}}>
          <Map location={this.state.event.location}/>
        </div>
        <Itinerary entries={this.state.event.itinerary}/>
      </div>
    )
  }
};

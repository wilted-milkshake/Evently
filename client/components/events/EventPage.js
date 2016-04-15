import React from 'react';
import Map from './Map.js';
import Itinerary from './Itinerary.js';
import GuestList from './GuestList.js';
import Chat from './Chat.js';

export default class EventPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: undefined,
      event: {
        url: '',
        title: '',
        date: null,
        coordinator: {},
        description: '',
        guests: [],
        locations: [
          {
            title: '', 
            address: '',
            description: '',
            time: null
            lat: 0,
            lng: 0
          }
        ],
        chats: []
      }
    }
  }

  componentWillMount() {
    this.setState({
      socket: this.configSocket(this.props.params.eventName)
    });
  }

  componentDidMount() {
    this.state.socket.emit('fetch data');
  }

  configSocket(eventID) {
    const socket = io.connect(window.location.origin, {
      query: `eventRoom=${eventID}`
    });
    socket.on('event data', data => this.setState({ event: data }));
    return socket;
  }

  isCoordinator() {
    return this.state.event.coordinator.includes(this.props.userID);
  }

  addMarker(marker) {
    this.state.socket.emit('new marker added', {marker: marker, id: this.state.event.id});
  }

  render() {
    const { itinerary, chats, name, locations, guests } = this.state.event;
    return (
      <div className="row">
        <div>
          <h2>Your Super Awesome Event</h2>
          <h2>{name}</h2>
          <h3>{this.props.user}</h3>
        </div>
        <div className="row">
          <div className="col s12 m6 l6">
            <Itinerary entries={itinerary} />
          </div>
          <div className="col s12 m6 l6">
            <div id="map" style={{ width: '400px', height: '350px' }}>
              <Map locations={locations} />
            </div>
          </div>
        </div>
        <div className="row">
          <GuestList guests={guests} />
          <Chat messages={chats} />
        </div>
        {this.isCoordinator() ? <p>work it guuurrl</p> : <p>you don't work it</p>}
      </div>
    );
  }
}

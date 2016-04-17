import React from 'react';
import Map from './Map.js';
import Itinerary from './Itinerary.js';
import GuestList from './GuestList.js';
import Chat from './Chat.js';

class EventPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: undefined,
      event: {
        url: '',
        title: '',
        date: null,
        coordinator: [],
        description: '',
        guests: [],
        locations: [
          {
            title: '',
            address: '',
            description: '',
            time: null,
            lat: 0,
            lng: 0,
          },
        ],
        chats: [],
      },
    };
  }

  componentWillMount() {
    this.setState({
      socket: this.configSocket(this.props.params.eventName),
    });
  }

  componentDidMount() {
    this.state.socket.emit('fetch data', this.props.params.eventName);
  }

  configSocket(eventID) {
    const socket = io.connect(window.location.origin, {
      query: `eventRoom=${eventID}`,
    });
    socket.on('event data', eventData => this.setState({ event: eventData }));
    socket.on('update profile', userData => this.props.onAddEvent(userData))
    return socket;
  }

  isCoordinator() {
    return this.state.event.coordinator.includes(this.props.user);
  }

  renderJoinLeaveButton() {
    if (this.state.event.guests.includes(this.props.user)) {
      return (
        <button
          className="waves-effect waves-light btn red right"
          onClick={() => this.state.socket.emit('leave event', this.props.user)}>
            Leave Event
        </button>
      );
    } else {
      return (
        <button
          className="waves-effect waves-light btn green accent-3 right"
          onClick={() => this.state.socket.emit('join event', this.props.user)}>
            Join Event
        </button>
      );
    }
  }

  addMarker(marker) {
    this.state.socket.emit('new marker added', { marker, id: this.state.event.id });
  }

  sendChat(message) {
    const chat = {
      message,
      author: this.props.user,
      timestamp: new Date(),
    };
    this.state.socket.emit('new chat', chat);
  }

  render() {
    const { locations, chats, title, guests } = this.state.event;
    return (
      <div className="row">
        <div className="row">
          <h2 className="left">{title}</h2>
          {this.renderJoinLeaveButton()}
        </div>
        <div className="row">
          <div className="col s12 m6 l6">
            <Itinerary entries={locations} />
          </div>
          <div className="col s12 m6 l6">
            <div id="map" style={{ width: '400px', height: '350px' }}>
              {/* <Map locations={locations} addMarker={this.addMarker.bind(this)} /> */}
            </div>
          </div>
        </div>
        <div className="row">
          <GuestList guests={guests} />
          <Chat messages={chats} sendChat={this.sendChat.bind(this)}/>
        </div>
        {this.isCoordinator() ? <p>work it guuurrl</p> : <p>you don't work it</p>}
      </div>
    );
  }
}

EventPage.propTypes = {
  params: React.PropTypes.object,
  user: React.PropTypes.string,
};

export default EventPage;

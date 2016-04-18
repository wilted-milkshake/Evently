import React from 'react';
import Map from './Map.js';
import Itinerary from './Itinerary.js';
import GuestList from './GuestList.js';
import Chat from './Chat.js';

class EventPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
            _id: 0
          },
        ],
        chats: [],
      },
    };
  }

  componentWillMount() {
    this.props.socket.on('event data', eventData => this.setState({ event: eventData }));
    this.props.socket.on('update profile', userData => this.props.onAddEvent(userData))
  }

  componentDidMount() {
    this.props.socket.emit('fetch data', this.props.params.eventName);
  }

  componentWillUnmount() {
    this.props.socket.emit('leave room', this.props.params.eventName);
  }

  isCoordinator() {
    return this.state.event.coordinator.includes(this.props.user);
  }

  renderJoinLeaveButton() {
    const { user, 'prams.eventName': room  } = this.props;
    if (this.state.event.guests.includes(this.props.user)) {
      return (
        <button
          className="join-leave-btn waves-effect waves-light btn red right"
          onClick={() => this.props.socket.emit('leave event', { user, room })}>
            Leave Event
        </button>
      );
    } else {
      return (
        <button
          className="join-leave-btn waves-effect waves-light btn green accent-3 right"
          onClick={() => this.props.socket.emit('join event', { user, room })}>
            Join Event
        </button>
      );
    }
  }

  addMarker(marker) {
    this.props.socket.emit('new marker added', { marker: marker, id: this.state.event._id });
  }

  updateLoc(newLoc, id) {
    this.props.socket.emit(
      'event updated',
      {
        updates: newLoc,
        id: id,
        event: this.props.params.eventName,
      }
    );
  }

  sendChat(message) {
    const chat = {
      message,
      author: this.props.user,
      timestamp: new Date(),
    };
    this.props.socket.emit('new chat', {chat, event: this.props.params.eventName});
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
            <Itinerary updateLoc={this.updateLoc.bind(this)} entries={locations} />
          </div>
          <div className="col s12 m6 l6">
            <div id="map" style={{ width: '400px', height: '350px' }}>
              <Map locations={locations} addMarker={this.addMarker.bind(this)} />
            </div>
          </div>
        </div>
        <div className="row">
          <GuestList guests={guests} />
          <Chat messages={chats} sendChat={this.sendChat.bind(this)}/>
        </div>
      </div>
    );
  }
}

EventPage.propTypes = {
  params: React.PropTypes.object,
  user: React.PropTypes.string,
};

export default EventPage;

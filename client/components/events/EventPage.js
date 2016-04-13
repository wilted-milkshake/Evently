import React from 'react';
import Map from './Map.js';
import Itinerary from './Itinerary.js';
// import Chat from './Chat.js';

const EventPage = props => (
  <div>
    <h2>Your Super Awesome Event</h2>
    <Map location={props.event.location}/>
    <Itinerary entries={props.event.itinerary}/>
    {/*<Chat />*/}
  </div>
);

export default EventPage;
// window.EventPage = EventPage;


/*
var Events = () => (
  <div>
    <h1>Event Page</h1>

    <ul>
      <li><Link to="/events/bonfire">Bonfire</Link></li>
      <li><Link to="/events/booty">Booty</Link></li>
    </ul>

  </div>
);

window.Events = Events;

var Event = (props) => (
  <div>
    <h2>{props.params.eventName}</h2>
  </div>
);

window.Event = Event;
*/

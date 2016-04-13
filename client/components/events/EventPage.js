import React from 'react';
import Map from './Map.js';
import Itinerary from './Itinerary.js';

const EventPage = props => (
  <div>
    <h2>Your Super Awesome Event</h2>
    <Map location={props.event.location}/>
    <Itinerary entries={props.event.itinerary}/>
  </div>
);

export default EventPage;
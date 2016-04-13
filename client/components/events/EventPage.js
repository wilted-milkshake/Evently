import React from 'react';
import Map from './Map.js';
import Itinerary from './Itinerary.js';

export default class EventPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Your Super Awesome Event</h2>
        <h2>{this.props.event.name}</h2>
        <Map location={this.props.event.location}/>
        <Itinerary entries={this.props.event.itinerary}/>
      </div>
    )
  }
};


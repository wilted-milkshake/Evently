import React from 'react';
import ItineraryEntry from './ItineraryEntry.js';

const Itinerary = (props) => (
  <div>
    <h3>Event Itinerary</h3>
    <table>
      <thead>
        <tr>
            <th>Time</th>
            <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {props.entries.map((e, i) => <ItineraryEntry {...e} key={i}/>)}
      </tbody>
    </table>
  </div>
);

export default Itinerary;
// window.Itinerary = Itinerary;

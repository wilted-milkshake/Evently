import React from 'react';

const ItineraryEntry = (props) => (
  <tr>
    <td>{props.time}</td>
    <td>{props.location}</td>
  </tr>
);

export default ItineraryEntry;
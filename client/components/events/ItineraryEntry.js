import React from 'react';

require('./../../styles/styles.css');

const ItineraryEntry = (props) => (
  <tr>
    <td>{props.time}</td>
    <td>{props.description}</td>
  </tr>
);

export default ItineraryEntry;
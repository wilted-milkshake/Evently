import React from 'react';

const ItineraryEntry = (props) => (
  <tr>
    <td>{props.time}</td>
    <td>{props.description}</td>
  </tr>
);

export default ItineraryEntry;

ItineraryEntry.propTypes = {
  time: React.PropTypes.string,
  description: React.PropTypes.string,
};

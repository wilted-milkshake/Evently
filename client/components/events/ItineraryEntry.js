import React from 'react';

const ItineraryEntry = (props) => (
  <tr onClick={props.toggleEdit}>
    <td>{props.time}</td>
    <td>{props.description}</td>
  </tr>
);

export default ItineraryEntry;

ItineraryEntry.propTypes = {
  time: React.PropTypes.string,
  description: React.PropTypes.string,
};

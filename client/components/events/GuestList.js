import React from 'react';

const GuestList = (props) => (
  <div className="col sm12 m4 l4">
    {props.guests.map( (g, i) => (
        <div className="chip" key={i}>
          {g}
        </div>
    ))}
  </div>
);

GuestList.propTypes = {
  guests: React.PropTypes.array,
};

export default GuestList;

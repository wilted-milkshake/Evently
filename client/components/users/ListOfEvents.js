import React from 'react';
import Event from './Event.js'

export default class ListOfEvents extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { events } = this.props;
    return (
      <div>
        <ul className="collection">
          { events.map((event, index) => <Event key={index} event={event} />) }
        </ul>
      </div>
    )
  }
};

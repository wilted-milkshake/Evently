import React from 'react';

export default class ListOfEvents extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      events
    } = this.props;
    return (
      <div>
        <ul>
          { events.map((event, index) => <Event key={index} event={event} />) }
        </ul>
      </div>
    )
  }
};
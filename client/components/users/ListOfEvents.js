import React from 'react';
import Event from './Event.js'

export default class ListOfEvents extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { events, socket } = this.props;
    return (
      <div>
        <ul>
          <li className="my-event">My Events</li>
          <hr />
          { events.map((event, index) => <Event key={event.url} event={event} socket={socket}/>) }
        </ul>
      </div>
    )
  }
};

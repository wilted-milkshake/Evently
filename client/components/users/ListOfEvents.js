import React from 'react';
import { Link } from 'react-router';
import Event from './Event.js';

require('./../../styles/styles.css');

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
        <Link to='/events/abc'>Test</Link>
        {/* events.map((event, index) => <Event key={index} event={event} />) */}
      </div>
    )
  }
};
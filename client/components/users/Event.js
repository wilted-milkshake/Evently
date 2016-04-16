import React from 'react';
import { Link } from 'react-router';

require('./../../styles/styles.css');

export default class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      event
    } = this.props;
    return (
      <Link
        to={`/events/${event.title}`}
        className="list-item">
        {event.title}
      </Link>
    )
  }
};

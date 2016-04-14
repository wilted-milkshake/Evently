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
      <li>
        <Link to={`/events/${event}`} className="collection-item">
          {event} <i className="material-icons">location_on</i>
        </Link>
      </li>
    )
  }
};

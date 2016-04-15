import React from 'react';
import { Link } from 'react-router';

require('./../../styles/styles.css');

export default class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      event,
      url
    } = this.props;
    return (
      <li>
        <Link to={`/events/${event.title}`} className="collection-item" activeClassName="active">
          {event.title} <i className="material-icons">location_on</i>
        </Link>
      </li> 
    )
  }
};

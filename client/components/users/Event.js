import React from 'react';
import { Link } from 'react-router';

require('./../../styles/styles.css');

export default class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, url } = this.props.event;
    return (
      <li>
        <Link to={`/events/${url}`} className="collection-item" activeClassName="active">
          {title} <i className="material-icons right">location_on</i>
        </Link>
      </li>
    )
  }
};

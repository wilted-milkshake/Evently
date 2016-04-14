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
      <li className="collection-item dismissable">
        <div><Link to={`/events/${event}`}>{event}<a className="secondary-content"><i className="material-icons">location_on</i></a></Link>
        </div>
      </li>
    )
  }
};

import React from 'react';
import { Link } from 'react-router';

require('./../../styles/styles.css');

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    console.log('e: ', props)
  }

  render() {
    const {
      user,
      event
    } = this.props;
    return (
      <li className="collection-item dismissable">
        <div><Link to={`/events/${event}`} params={{user: user}} className="secondary-content">{event}<i className="material-icons">location_on</i></Link>
        </div>
      </li>
    )
  }
};

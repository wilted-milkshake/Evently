import React from 'react';

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
        <div>{event.title}<a href="#!" className="secondary-content"><i className="material-icons">location_on</i></a>
        </div>
      </li>
    )
  }
}
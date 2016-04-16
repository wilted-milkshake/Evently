import React from 'react';
import { Link } from 'react-router';

require('./../../styles/styles.css');

export default class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    console.log('HIHIHIH', this.props.event);
    $(".button-collapse").sideNav('hide')
    this.props.fetchEvent();
  }

  render() {
    const {
      event
    } = this.props;
    return (
      <Link
        to={`/events/${event.title}`}
        className="list-item"
        onClick={this.handleClick.bind(this)} >
        {event.title}
      </Link>
    )
  }
};

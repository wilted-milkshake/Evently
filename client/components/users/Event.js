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
      <li>
        {this.props.event.title}
      </li>
    )
  }
};

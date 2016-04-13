import React from 'react';

var Links = () => (
  <div>
    <li><IndexLink to="/" activeStyle={{ color: 'red' }}>Home</IndexLink></li>
    <li><Link to="/events" activeStyle={{ color: 'red' }}>Events</Link></li>
    <li><Link to="/signin" activeStyle={{ color: 'red' }}>Sign In</Link></li>
    <li><Link to="/signup" activeStyle={{ color: 'red' }}>Sign Up</Link></li>
  </div>
);

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
        <ul>
          { events.map((event, index) => <Event key={index} event={event} />) }
        </ul>
      </div>
    )
  }
};
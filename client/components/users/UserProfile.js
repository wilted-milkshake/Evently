import React from 'react';
import { Link } from 'react-router';
import ListOfEvents from './ListOfEvents.js';

require('./../../styles/styles.css');

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
  }

  joinEvent() {
    console.log('hi');
  }

  render() {
    const {
      username,
      events
    } = this.props
    return (
      <div className="profile">
        <h3 className="username">{username}</h3>
        {/*Logout button*/}
        <div className="logout-btn">
          <a href='/logout' className="waves-effect waves-light btn logouta"><span className='logout'>Logout</span></a>
        </div>
        {/*Join an event*/}
        <button onClick={this.joinEvent.bind(this)} className="waves-effect waves-light btn">Join an Event</button>
        {/*Create an event button*/}
        <div className="add-btn btn-floating btn-large waves-effect waves-light blue"><Link to='/events'><i className="material-icons">add</i></Link></div>
        {/*<Link to='/events/abc'>Test</Link>*/}
        <ListOfEvents events={events} />
        
      </div>
    );
  }

};

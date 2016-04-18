import React from 'react';
import { Link } from 'react-router';
import ListOfEvents from './ListOfEvents.js';

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { username, events } = this.props
    return (
      <div className="profile">
        <h3 className="username">{username}</h3>
        <div className="parent">
          <a href='/logout' className="logout-btn waves-effect waves-light btn white-text">Logout</a>
        </div>
        <div className="add-btn btn-floating btn-large waves-effect waves-light yellow"><Link to='/events'><i className="material-icons">add</i></Link></div>
        <ListOfEvents events={events} />
      </div>
    );
  }

};

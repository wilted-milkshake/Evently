import React from 'react';
import { Link } from 'react-router';
import ListOfEvents from './ListOfEvents.js';

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { username, events, socket } = this.props
    return (
      <div className="profile">
        <h3 className="username">{username}</h3>
        <div className="parent">
          <a href='/logout' className="logout-btn waves-effect waves-light btn white-text">Logout</a>
        </div>
        <div
          onClick={$(".button-collapse").sideNav('hide')}
          className="add-btn btn-floating btn-large waves-effect waves-light yellow">
          <Link to='/events'><i className="material-icons">add</i></Link>
        </div>
        <ListOfEvents events={events} socket={socket}/>
      </div>
    );
  }

};

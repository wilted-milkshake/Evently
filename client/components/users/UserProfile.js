import React from 'react';
import { Link } from 'react-router';
import ListOfEvents from './ListOfEvents.js';
import { Link } from 'react-router';

require('./../../styles/styles.css');

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      events: []
    }
  }

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile() {
    $.ajax({
      type: 'GET',
      url: '/api/users',
      dataType: 'json',
      success: function(data) {
        this.setState({
          username: data.local.username,
          events: data.events
        });
      }.bind(this),
      fail: function(err) {
        console.error(err);
      }
    });
  }

  render() {
    const {
      username,
      events
    } = this.props
    return (
      <div>
        <h3 className="username">{username}</h3>
        {/*Logout button*/}
        <div className="logout-btn">
          <a href='/logout' className="waves-effect waves-light btn-large">Logout</a>
        </div>
        {/*Create an event button*/}
        <Link to='/form'><div className="add-btn btn-floating btn-large waves-effect waves-light blue"><i className="material-icons">add</i></div></Link>
        <ListOfEvents events={events} />
      </div>
    );
  }

};

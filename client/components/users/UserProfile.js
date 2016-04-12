var React = require('react');
// var ReactDOM = require('react-dom');

// import React from 'react';


export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    }
  }

  showForm() {
    this.setState({
      showForm: !this.state.showForm
    })
  }
  render() {
    return (
      <div>
        USER PROFILE TODAYYYY
        {/*<CreateEventButton showForm={this.showForm.bind(this)} />
        {this.state.showForm ? <AddEventForm showForm={this.showForm.bind(this)} /> : null}
        <ListOfEvents events={this.props.events} />*/}
      </div>
    )
  }
};

// export default UserProfile;
import React from 'react';
import CreateEventButton from './createEventButton.js';
import AddEventForm from './addEventForm.js';
import ListOfEvents from './listOfEvents.js';
import EventPage from './../events/EventPage.js';

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
      HWLLO
        <CreateEventButton showForm={this.showForm.bind(this)}/>
        {this.state.showForm ? <AddEventForm showForm={this.showForm.bind(this)}/> : null}
        {/*<CreateEventButton showForm={this.showForm.bind(this)} />
        {this.state.showForm ? <AddEventForm showForm={this.showForm.bind(this)} /> : null}
        <ListOfEvents events={this.props.events} />*/}
      </div>
    )
  }
};
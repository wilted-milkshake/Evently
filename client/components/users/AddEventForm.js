import React from 'react';

export default class AddEventForm extends React.Component {

  postEvent(e) {
    e.preventDefault();
    var eventInfo = {
      title: $('#event_title')[0].value,
      date: $('#date')[0].value,
      coordinator: [this.props.user],
      description: '',
      locations: [
        {
          title: $('#event_location')[0].value,
          address: $('#address')[0].value,
          time: $('#time')[0].value,
          description: '',
          lat: 0,
          lng: 0,
        },
      ],
      guests: [this.props.user],
      chats: [],
    };
    $.ajax({
      type: 'POST',
      url: '/api/events/',
      data: JSON.stringify(eventInfo),
      dataType: 'json',
      contentType: 'application/json',
      success: (events) => this.props.onAddEvent(events),
    });
  }

  render() {
    return (
      <div className="row">
        <h3>Create a new event</h3>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input id="event_title" type="text" className="validate" />
              <label htmlFor="event_title">Event Title</label>
            </div>
            <div className="input-field col s6">
              <input id="event_location" type="text" className="validate" />
              <label htmlFor="event_location">Event Location</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="address" type="text" className="validate" />
              <label htmlFor="address">Address</label>
            </div>
            <div className="input-field col s2">
              <input id="time" type="time" className="validate" />
            </div>
            <div className="input-field col s4">
              <input id="date" type="date" className="validate" />
            </div>
          </div>
          <button onClick={this.postEvent.bind(this)} className="btn waves-effect waves-light" type="submit" name="action">
            Submit<i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}

AddEventForm.propTypes = {
  user: React.PropTypes.string,
  onAddEvent: React.PropTypes.func,
};

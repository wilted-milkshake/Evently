import React from 'react';
// import $ from 'jquery';
require('./../../styles/styles.css');

export default class AddEventForm extends React.Component {
  constructor(props) {
    super(props);
  }

  postEvent(e) {
    e.preventDefault();
    var eventInfo = {
      title: $('#event_title')[0].value,
      date: $('#date')[0].value,
      coordinator: this.props.user,
      locations: [
        {
          title: $('#event_location')[0].value,
          address: $('#address')[0].value,
          time: $('#time')[0].value,
          description: '',
          latitude: 0,
          longitude: 0
        }
      ],
      guests: []
    };
    console.log('EVENT INFO in POST EVENT', eventInfo)
    $.ajax({
      type: 'POST',
      url: '/events/create',
      data: JSON.stringify(eventInfo),
      dataType: 'json',
      contentType: 'application/json',
      success: function(newEvent) {
        this.props.onAddEvent(newEvent);
      }.bind(this)
    })
  };

  render() {
    return (
      <div className="row">
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
          <button onClick={this.postEvent.bind(this)} className="btn waves-effect waves-light" type="submit" name="action">Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    )
  }
};

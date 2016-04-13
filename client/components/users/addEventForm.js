import React from 'react';
import $ from 'jquery';

export default class AddEventForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        AddEventForm
      </div>
    )
  }

  // postEvent(e) {
  //   e.preventDefault();
  //   this.props.showForm();
  //   var eventInfo = {
  //     title: $('#event_title')[0].value,
  //     date: $('#date')[0].value,
  //     locations: [
  //       {
  //         name: $('#event_location')[0].value,
  //         address: $('#address')[0].value,
  //         latitude: 0,
  //         longitude: 0,
  //         time: $('#time')[0].value
  //       }
  //     ]
  //   };
  //   $.ajax({
  //     type: 'POST',
  //     url: '/events/create',
  //     data: JSON.stringify(eventInfo),
  //     dataType: 'json',
  //     contentType: 'application/json'
  //   });
  // }

  // render() {
  //   return (
  //     <div className="container row">
  //       <form className="col s12">
  //         <div className="row">
  //           <div className="input-field col s6">
  //             <input id="event_title" type="text" className="validate" />
  //             <label htmlFor="event_title">Event Title</label>
  //           </div>
  //           <div className="input-field col s6">
  //             <input id="event_location" type="text" className="validate" />
  //             <label htmlFor="event_location">Event Location</label>
  //           </div>
  //         </div>
  //         <div className="row">
  //           <div className="input-field col s6">
  //             <input id="address" type="text" className="validate" />
  //             <label htmlFor="address">Address</label>
  //           </div>
  //           <div className="input-field col s2">
  //             <input id="time" type="time" className="validate" />
  //           </div>
  //           <div className="input-field col s4">
  //             <input id="date" type="date" className="validate" />
  //           </div>
  //           <button onClick={this.postEvent.bind(this)} className="btn waves-effect waves-light" type="submit" name="action">Submit
  //             <i className="material-icons right">send</i>
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   )
  // }
};
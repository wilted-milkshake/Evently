import React from 'react';
import $ from 'jquery';

require('./../../styles/styles.css');

export default class JoinAnEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      events,
      joinEvent
    } = this.props;
    return (
      <div>
        <a className='dropdown-button btn style-btn' data-beloworigin="true" href='#' data-activates='dropdown1'><span className='btn-text'>Join An Event</span></a>
        <ul id='dropdown1' className='dropdown-content'>
          <li><a href="#!">one</a></li>
          <li><a href="#!">two</a></li>
          <li><a href="#!">three</a></li>
        </ul>
      </div>
    )
  }
};


  // <div className="logout-btn">
  //   <a onClick={this.joinEvent.bind(this)} className="waves-effect waves-light btn logouta"><span className='logout'>Join an Event</span></a>
  // </div>


  // <ul id='dropdown1' className='dropdown-content'>
  //   <li><a className='dropdown-button' href='#' data-activates='dropdown1'>Drop Me!</a></li>
  //   <li><a href="#!">one</a></li>
  //   <li><a href="#!">two</a></li>
  //   <li><a href="#!">three</a></li>
  // </ul>
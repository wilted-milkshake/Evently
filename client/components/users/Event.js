class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      event
    } = this.props;
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{event.title}</span>
              <p>{event.address}</p>
              <p>{event.date}</p>
              <p>{event.time}</p>
            </div>
            <div className="card-action">
              <a href="#">{event.location}</a>
            </div>
          </div>
        </div>
      </div>
     )
  }
};

window.Event = Event;
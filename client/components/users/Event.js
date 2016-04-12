class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.event.title}
      </div>
    )
  }
};

window.Event = Event;
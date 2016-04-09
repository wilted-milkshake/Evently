class CreateEventButton extends React.Component {
  constructor(props) {
    super(props);
  }

  createEvent() {
    console.log('hi');
    this.props.showForm();
  }

  render() {
    return (
      <div>
        <a onClick={this.createEvent.bind(this)} className="waves-effect waves-light btn-large">Create an Event</a>
      </div>
    )
  }
};

window.CreateEventButton = CreateEventButton;

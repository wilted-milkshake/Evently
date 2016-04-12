class ListOfEvents extends React.Component {
  constructor(props) {
    super(props);
  }

  goToEvent() {
    // console.log(axios)
  }

  render() {
    const {
      events
    } = this.props;
    return (
      <div>
        <ul>
          { events.map((event, index) => <Event key={index} onClick={this.goToEvent.bind(this)} event={event} />) }
        </ul>
      </div>
    )
  }
};

window.ListOfEvents = ListOfEvents;
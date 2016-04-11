class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        url: '/api/events/abc',
        itinerary: [
          {
            time: '1:45 pm',
            location: 'here'
          },
          {
            time: '2:00 pm',
            location: 'a little bit away from here'
          },
          {
            time: '3:00 pm',
            location: 'super far away'
          }
        ],
        location: {lat: -34.397, lng: 150.644},
        chats: []
      }
    };
  }

  render() {
    return (
      <div>
        <h1>Evently.io</h1>
        <UserProfile />
        <EventPage {...this.state.event}/>
      </div>
    );
  }
}



ReactDOM.render(<App />, document.getElementById('app'));

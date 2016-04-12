class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      events: [
        {
          title: 'Bonfire',
          date: new Date(),
          time: '1:00pm',
          Coordinator: 'Megan'
        },
        {
          title: 'Zoo',
          date: new Date(),
          time: '1:00pm',
          Coordinator: 'Allison'
        }
      ],
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

  componentDidMount() {
    $.ajax({
      url: '/api/events/users',
      dataType: 'json',
      success: function(data) {
        console.log(data.local.username, 'LOCALDATA')
        this.setState({
          username: data.local.username
        });
      }.bind(this)
    });
  }
  getUser() {
    console.log(this.state.username);
  }

  render() {
    const {
      events,
      username
    } = this.state;
    return (
      <div>
        <h1>Evently.io</h1>
        <div>
          <li>{username}</li>
          <li>logout</li>
        </div>
        <UserProfile username={username} events={events} />
        {/*<EventPage {...this.state.event}/>*/}
      </div>
    );
  }
}



ReactDOM.render(<App />, document.getElementById('app'));

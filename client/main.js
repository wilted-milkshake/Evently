var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
var IndexLink = ReactRouter.IndexLink;



// var Links = () => (
//   <div>
//     <li><IndexLink to="/" activeStyle={{ color: 'red' }}>Home</IndexLink></li>
//     <li><Link to="/events" activeStyle={{ color: 'red' }}>Events</Link></li>
//   </div>
// );

// window.Links = Links;

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
//
// ReactDOM.render((
//   <Router history={ browserHistory }>
//     <Route path="/" component={App}>
//       <IndexRoute component={UserProfile}/>
//       <Route path="/events" component={Event}></Route>
//       <Route path="/events/:eventID" component={EventPage}></Route>
//       {/*<Route path="/signin" component={SignIn}></Route>
//       <Route path="/signup" component={SignUp}></Route>*/}
//     </Route>
//   </Router>
//   ),
//   document.getElementById('app')
// );

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
var IndexLink = ReactRouter.IndexLink;


var Links = () => (
  <div>
    <li><IndexLink to="/" activeStyle={{ color: 'red' }}>Home</IndexLink></li>
    <li><Link to="/events" activeStyle={{ color: 'red' }}>Events</Link></li>
    <li><a href='/logout'>Logout</a></li>
  </div>
);

var App = (props) => (
  <div>
    <h1>Evently.io</h1>
    <Map />
    <Links />
    {props.children}
  </div>
);


var About = () => (
  <div>
    <h1>About Page</h1>
  </div>
);

var Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);


window.Links = Links;

ReactDOM.render((
  <Router history={ browserHistory }>
    <Route path="/users" component={App}>
      <IndexRoute component={UserProfile}/>
      <Route path="/events" component={Events}></Route>
      <Route path="/events/:eventName" component={Event}></Route>
    </Route>
  </Router>
  ),
  document.getElementById('app')
);

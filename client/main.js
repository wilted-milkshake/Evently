var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
var IndexLink = ReactRouter.IndexLink;


var Links = () => (
  <nav>
    <li><IndexLink to="/" activeStyle={{ color: 'red' }}>Home</IndexLink></li>
    <li><Link to="/events" activeStyle={{ color: 'red' }}>Events</Link></li>
    <li><Link to="/signin" activeStyle={{ color: 'red' }}>Sign In</Link></li>
    <li><Link to="/signup" activeStyle={{ color: 'red' }}>Sign Up</Link></li>
  </nav>
);

var App = (props) => (
  <div>
    <h1>Evently.io</h1>
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
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/events" component={Events}></Route>
      <Route path="/events/:eventName" component={Event}></Route>
      <Route path="/signin" component={SignIn}></Route>
      <Route path="/signup" component={SignUp}></Route>
    </Route>
  </Router>
  ),
  document.getElementById('app')
);

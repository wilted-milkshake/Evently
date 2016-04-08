class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUserNameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/users/signin', {
      username: this.state.username,
      password: this.state.password
    })
    .then()
    .catch(function(err) {
      console.error(err);
    });
  }

  render() {
    return (
      <div>
        <h2 className="form-signin-heading">Please sign in</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" value={this.state.username} onChange={(e) => this.handleUserNameChange(e)} placeholder="Username" autofocus required />
          <input type="password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

window.SignIn = SignIn;

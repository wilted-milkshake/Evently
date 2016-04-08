class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 class="form-signin-heading">Please sign in</h2>
        <form>
          <label for="inputUser" class="sr-only">Username</label>
          <input type="text" name="username" id="inputUser" placeholder="Username" autofocus required>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" placeholder="Password" required>
          <button>Sign In</button>
        </form>
      </div>
    )
  }
}

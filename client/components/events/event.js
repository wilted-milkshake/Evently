class Event extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" text="Username" />
          <input type="password" text="Password" />
          <button>signup</button>
        </form>
        <a href='/signin'>Already have an account? <strong>Signin</strong> ...</a>
      </div>
    )
  }
}
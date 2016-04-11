class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      events: []
    }
  }

  showForm() {
    this.setState({
      showForm: !this.state.showForm
    })
  }
  render() {
    return (
      <div>
        <CreateEventButton showForm={this.showForm.bind(this)} />
        {this.state.showForm ? <AddEventForm showForm={this.showForm.bind(this)} /> : null}
        <ListOfEvents events={this.state.events} />
      </div>
    )
  }
};

window.UserProfile = UserProfile;
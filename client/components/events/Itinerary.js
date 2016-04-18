import React from 'react';
import ItineraryEntry from './ItineraryEntry.js';

class Itinerary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: null
    };
  }

  toggleEdit(entryId) {
    this.setState({ editing: entryId });
  }

  handleEditItem() {
    var values = document.querySelectorAll('#edit-row input');
    var newLocation = {
      time: values[0].value,
      description: values[1].value,
    };
    this.props.updateLoc(newLocation, this.state.editing);
    this.setState({ editing: null });
  }

  handleRemove() {
    this.props.removeLoc(this.state.editing);
    this.setState({ editing: null });
  }

  renderEntryOrEditField(e) {
    if (this.state.editing === e._id) {
      return (
        <tr id="edit-row">
          <td><input type="time" name="time" defaultValue={e.time} /></td>
          <td><input type="text" name="description" defaultValue={e.description} />
          </td>
          <td>
            <a
              className="secondary-content update-btn"
              onClick={this.handleEditItem.bind(this)}>
              <i className="material-icons">done</i>
            </a>
          </td>
          <td>
            <a
              className="secondary-content update-btn"
              onClick={this.handleRemove.bind(this)}>
              <i className="material-icons">not_interested</i>
            </a>
          </td>
        </tr>
      );
    }
    return (
      <ItineraryEntry toggleEdit={this.toggleEdit.bind(this, e._id)} time={e.time} description={e.description} key={e._id} />
    );
  }

  render() {
    return (
      <div>
        <h4>Event Itinerary</h4>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.props.entries.map(e => this.renderEntryOrEditField(e))}
          </tbody>
        </table>
      </div>
    )
  }
}


export default Itinerary;

Itinerary.propTypes = {
  entries: React.PropTypes.array,
};

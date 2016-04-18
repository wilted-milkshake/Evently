import React from 'react';
import ItineraryEntry from './ItineraryEntry.js';

class Itinerary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: null
    }
  }

  toggleEdit(entryId) {
    console.log(entryId);
    this.setState( { editing: entryId } )
  }

  handleEditItem() {
    this.setState({editing: null})
  }

  renderEntryOrEditField(e) {
    console.log('EEE', e);
    if (this.state.editing === e._id) {
      return (
        <tr>
          <td><input type="time" name="time" defaultValue={e.time} /></td>
          <td><input type="text" name="description" defaultValue={e.description} /></td>
          <td><a onClick={ this.handleEditItem.bind(this) } className="waves-effect waves-light btn">update</a></td>
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
        <h3>Event Itinerary</h3>
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

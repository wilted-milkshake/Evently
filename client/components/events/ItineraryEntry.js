const ItineraryEntry = (props) => (
  <tr>
    <td>{props.time}</td>
    <td>{props.location}</td>
  </tr>
);

window.ItineraryEntry = ItineraryEntry;

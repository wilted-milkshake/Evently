class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var myLatLong = {lat: -34.397, lng: 150.644};
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLong,
      zoom: 8
    });
    var marker = new google.maps.Marker({
      position: myLatLong,
      map: map,
      title: 'Hello Poop!'
    });
  }

  render() {
    return(
      <div id="map" style={{width: '600px', height:'450px'}}>
      </div>
    )
  }
}
window.Map = Map;

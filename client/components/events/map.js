class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: this.props.location,
      zoom: 8
    });
    var marker = new google.maps.Marker({
      position: this.props.location,
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

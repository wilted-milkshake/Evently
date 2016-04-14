import React from 'react';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.drawMap(nextProps);
  }

  drawMap(props) {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: props.location,
      zoom: 8
    });
    var marker = new google.maps.Marker({
      position: props.location,
      map: map,
      title: 'Australia!'
    });
  }

  render() {
    return(<p>your map here</p>);
  }
}

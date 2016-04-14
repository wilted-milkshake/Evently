import React from 'react';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.drawMap(nextProps);
  }

  createInfoWindowContent(marker) {
    return (
      '<div class="info_content">' +
      '<h3>' + marker.name + '</h3>' +
      '<p>' + marker.address + '</p>' +
      '<p>' + marker.time + '</p>' +
      '</div>'
    );
  }

  drawMap(props) {
    var eventMap = new google.maps.Map(document.getElementById('map'));
    var bounds = new google.maps.LatLngBounds();
    var infoWindow = new google.maps.InfoWindow();
    var markers = this.props.locations;

    var createInfo = this.createInfoWindowContent.bind(this);
    // Info Window content for each InfoWindow() marker
    var infoWindowContent = markers.map(marker => createInfo(marker));

    // set up existing locations markers
    for (var i = 0; i < markers.length; i++) {
      // get LatLng object from marker
      var position = new google.maps.LatLng({
        lat: markers[i].lat,
        lng: markers[i].lng
      });
      // extends map bounds to contain the marker
      bounds.extend(position);
      // create marker object
      var markerObj = new google.maps.Marker({
        position: position,
        map: eventMap,
        draggable: true,
        title: markers[i].name
      });
      // on click, show InfoWindow
      google.maps.event.addListener(markerObj, 'click', (function(mrkr, content) {
        return function() {
          infoWindow.setContent(infoWindowContent[content]);
          infoWindow.open(eventMap, mrkr);
        }
      })(markerObj, i));
      // center the map based on marker positions
      eventMap.fitBounds(bounds);
    }


    // event listener for click to add a marker
    google.maps.event.addListener(eventMap, 'dblclick', function(event) {
      // create marker on screen
      var markerObj = new google.maps.Marker({
        position: event.latLng,
        map: eventMap, // this.getMap(),
        animation: google.maps.Animation.DROP,
        draggable: true,
        title: 'untitled event'
      });

      infoWindowContent.push(createInfo(markerObj));

      var info = new google.maps.InfoWindow();

      google.maps.event.addListener(markerObj, 'click', function() {
        info.setContent(markerObj.position.lat().toString());
        info.open(eventMap, markerObj);
      });
      // set up marker information to be added to database
      var markerInfo = {
        name: markerObj.title,
        address: 'lat: ' + markerObj.position.lat() + ', long: ' + markerObj.position.lng(),
        latitude: markerObj.position.lat(),
        longitude: markerObj.position.lng(),
        time: null
      };

      var geocoder = new google.maps.Geocoder();
      // reverse geo-code: get request for a human-readable address of dropped marker
      geocoder.geocode({'latLng': markerObj.position}, function(res, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (res[0]) {
            markerInfo.address = res[0].formatted_address;
          } else {
            alert("No results found");
          }
        } else {
          alert("Could not get address from latLng: " + status);
        }
      });
      // add marker information to event table
      $.ajax({
        type: 'POST',
        url: 'api/events',
        data: JSON.stringify(markerInfo),
        dataType: 'json',
        contentType: 'application/json'
      });
    });
  }

  render() {
    return(<p>your map here</p>);
  }
}

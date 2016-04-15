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
      '<h3>' + marker.title + '</h3>' +
      '<p>' + marker.address + '</p>' +
      '<p>' + marker.time + '</p>' +
      '<p>' + marker.description + '</p>' +
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
        title: markers[i].title,
        map: eventMap,
        position: position,
        draggable: true
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
        title: 'untitled event',
        map: eventMap, // this.getMap(),
        position: event.latLng,
        draggable: true,
        animation: google.maps.Animation.DROP
      });

      infoWindowContent.push(createInfo(markerObj));

      var info = new google.maps.InfoWindow();

      google.maps.event.addListener(markerObj, 'click', function() {
        info.setContent(markerObj.position.toString());
        info.open(eventMap, markerObj);
      });
      // set up marker information to be added to database
      var markerInfo = {
        title: markerObj.title,
        address: '',
        description: 'no description',
        time: null,
        lat: markerObj.position.lat(),
        lng: markerObj.position.lng()
      };

      var geocoder = new google.maps.Geocoder();
      // get human-readable address of dropped marker (reverse geo-coding)
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
        // add marker information to event table
        props.addMarker(markerInfo);
      });
    });
  }

  render() {
    return(<p>your map here</p>);
  }
}

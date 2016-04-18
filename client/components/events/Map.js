import React from 'react';

export default class Map extends React.Component {

  componentWillReceiveProps(nextProps) {
    this.drawMap(nextProps);
  }

  createInfoWindowContent(marker) {
    return (
      `<div class="info_content">
      <h3>${marker.title}</h3>
      <p>${marker.address}</p>
      <p>${marker.time}</p>
      <p>${marker.description}</p>
      </div>`
    );
  }

  drawMap(props) {
    const eventMap = new google.maps.Map(document.getElementById('map'), {zoom: 100, center: {lat: 0, lng: 0}});
    const bounds = new google.maps.LatLngBounds();
    const infoWindow = new google.maps.InfoWindow();
    const geocoder = new google.maps.Geocoder();
    const markers = props.locations;
    const createInfo = this.createInfoWindowContent.bind(this);
    // Info Window content for each InfoWindow() marker
    const infoWindowContent = markers.map(marker => createInfo(marker));

    // function codeAddress(map, address) {
    //   geocoder.geocode({'address': address}, (results, status) => {
    //     if (status = google.maps.GeocoderStatus.OK) {
    //       map.setCenter(results[0].geometry.location);
    //       var marker = new google.maps.Marker({
    //         label: markers.length.toString(),
    //         map: map,
    //         title: markers[0].title,
    //         position: results[0].geometry.location,
    //         draggable: true,
    //       });
    //       return marker;
    //     } else {
    //       console.error('Error in codeAddress function', status);
    //     }
    //   });
    // }
    // set up existing locations markers
    for (let i = 0; i < markers.length; i++) {
      let markerObj;
      let position;
      // if (markers[i].lat === null || markers[i].lng === undefined) {
      //   markerObj = codeAddress(eventMap, markers[i].address);
      //   position = markerObj.getPosition();
      // } else {
        // get LatLng object from marker
        position = new google.maps.LatLng({
          lat: markers[i].lat,
          lng: markers[i].lng,
        });
        // create marker object
        markerObj = new google.maps.Marker({
          position,
          label: 'a',
          title: markers[i].title,
          map: eventMap,
        });
      // }
      // extends map bounds to contain the marker
      bounds.extend(position);
      // on click, show InfoWindow
      google.maps.event.addListener(markerObj, 'click', (function(mrkr, content) {
        return () => {
          infoWindow.setContent(infoWindowContent[content]);
          infoWindow.open(eventMap, mrkr);
        };
      })(markerObj, i));
      
    }


    // event listener for click to add a marker
    google.maps.event.addListener(eventMap, 'dblclick', function(event) {
      // create marker on screen
      const newMarker = new google.maps.Marker({
        label: markers.length.toString(),
        title: 'untitled event',
        map: eventMap, // this.getMap(),
        position: event.latLng,
        draggable: true,
        animation: google.maps.Animation.DROP
      });
      console.log('MarkerObj', newMarker);
      infoWindowContent.push(createInfo(newMarker));

      const info = new google.maps.InfoWindow();

      google.maps.event.addListener(newMarker, 'click', function() {
        info.setContent(newMarker.position.toString());
        info.open(eventMap, newMarker);
      });
      // set up marker information to be added to database
      const markerInfo = {
        index: markers.length.toString(),
        title: newMarker.title,
        address: '',
        description: 'add a description',
        time: null,
        lat: newMarker.position.lat(),
        lng: newMarker.position.lng(),
      };

      // get human-readable address of dropped marker (reverse geo-coding)
      geocoder.geocode({ latLng: newMarker.position }, (res, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (res[0]) {
            markerInfo.address = res[0].formatted_address;
          } else {
            console.log("No results found");
          }
        } else {
          console.log(`Could not get address from latLng: ${status}`);
        }
        // add marker information to event table
        props.addMarker(markerInfo);
      });
    });
    // codeAddress(eventMap, markers[0].address);

    eventMap.setCenter(bounds.getCenter());
    eventMap.setZoom(9);
  }

  render() {
    return (<p>your map here</p>);
  }
}

Map.propTypes = {
  locations: React.PropTypes.array,
};
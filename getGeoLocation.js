AFRAME.registerComponent('peakfinder', {
    init: function() {
        alert('Peakfinder component initialising!');
    }
});

/*
var el = document.querySelector('#GPScoord');
//lat = el.getAttribute('gps-projected-entity-place').latitude;
//console.log("lat:" + lat)

// Only the properties passed in the object will be overwritten.
/*
el.setAttribute('gps-projected-entity-place', {
    latitude: 'spot',
    longitude: 30,
  });
*/
navigator.geolocation.getCurrentPosition(setLocation); 

function setLocation(position) {
    var el = document.querySelector('#GPScoord');
    el.setAttribute('gps-projected-entity-place', {
        latitude: position.coords.latitude + 0.0005,
        longitude:  position.coords.longitude + 0.0005,
      });
    console.log(el.getAttribute('gps-projected-entity-place').latitude);
    console.log(el.getAttribute('gps-projected-entity-place').longitude)
}


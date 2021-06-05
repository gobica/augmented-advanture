
var map;
var service;
var infowindow;

initialize();


function initialize() {
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: '3000',
    query: 'restaurant'
  };
  service.textSearch(request, callback);
}


function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place);
     // createMarker(results[i]);
    }
  }
}
//const { connect } = require("http2");
distances = 

AFRAME.registerComponent('finder', {
    init: function () {
        this.data = [];
        this.loaded = false;
        this.heights = [-100, 0,  100, 200, 300, 400, 500, 600, 700, 800]; 
        this.stevec = 0; 
        window.addEventListener('gps-camera-update-position', e => {
            if (this.loaded === false) {
                this._loadLocations(e.detail.position.longitude, e.detail.position.latitude);
                this.loaded = true;
                console.log("zakaj ne delas, a? zakva", this.el)

            }
        });
    },

    _loadLocations: function (longitude, latitude) {
        const scale = 200;
        var el = this.el;
        var locationsString;
        var locations = new Array();
        var len = 0;
        var scene = document.querySelector('a-scene');

        console.log(`https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&type=tourist_attraction&rankby=distance&radius=2000&key=AIzaSyCC2aDWxhRGLni1Tz5MlhdX9-6WwX5d3kM`);
        fetch(`https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&type=tourist_attraction&rankby=distance&key=AIzaSyCC2aDWxhRGLni1Tz5MlhdX9-6WwX5d3kM`)
            .then(function (response) {

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // response from API 

                raycaster = "objects: [data-raycastable]";
                response.json().then(function (data) {
                    //  datas = data.results.filter(result =>  result.name = ))
                    this.data = data;
                    console.log(data);

                    data.results.forEach(element => {
                        var name = element.name;
                        var elementType = element.types[0];
                        var icon = element.icon;

                        console.log(elementType, name);

                        const entity = document.createElement('a-image');
                        var imageSrcDef = '/IP-location-based-ar/images/' + "landmark" + '.png'
                        var imageSrc = '/IP-location-based-ar/images/' + elementType + '.png';
                        //var imageSrc = icon;
                        //  entity.setAttribute('id', name);
                        entity.classList.add("clickable");

                        try {
                        entity.setAttribute('src', imageSrc);
                        }
                        catch (err) {
                        entity.setAttribute('src', imageSrcDef);
                        } 
                        //entity.setAttribute('htmlembed', '');
                        entity.setAttribute('look-at', '[gps-projected-camera]');
                        entity.setAttribute('value', element.name);
                        entity.setAttribute('scale', {
                            x: scale,
                            y: scale,
                            z: scale
                        });

                        // Get the modal
                        var modal = document.getElementById("myModal");
                        // Get the <span> element that closes the modal
                        var span = document.getElementsByClassName("close")[0];
    
                        // When the user clicks on <span> (x), close the modal
                        span.onclick = function () {
                            modal.style.display = "none";
                        }
                        // When the user clicks anywhere outside of the modal, close it
                        window.onclick = function (event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        }
                        var rating = element.rating;
                        var openingHours = "";
                        if (typeof(element.opening_hours) !==  'undefined') var openingHours_boolean = element.opening_hours.open_now;


                        if (openingHours_boolean == true) openingHours = "Odprto"
                        if (openingHours_boolean == false)  openingHours = "Zaprto"

                      entity.setAttribute('color', '#4CC3D9');
                      //  entity.setAttribute('event-set__enter', '_event: click; color: #8FF7FF');
                      //  entity.setAttribute('event-set__leave', '_event: click; color: #000000');    
                      lat = element.geometry.location.lat;
                      lng = element.geometry.location.lng;

                      var distance = getDistanceFromLatLonInKm(latitude, longitude, lat, lng);
                      normalized_distance = distance / 1.5
                      entity.setAttribute('position', {
                          x: 0,
                          y: this.heights[this.stevec],
                          z: 0
                      });
                      this.stevec ++;
                      console.log(distance);
                      entity.setAttribute('gps-projected-entity-place', {
                          latitude: lat,
                          longitude: lng
                      });

                        var name = element.name;
                        var photoreference = element.photos[0].photo_reference;
                        var image_url = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoreference}&sensor=false&maxheight=1000&maxwidth=300&key=AIzaSyCC2aDWxhRGLni1Tz5MlhdX9-6WwX5d3kM`
                        console.log("imageurl", image_url);

                        entity.addEventListener('click', function () {
                            // zdej pa se more nekej nardit 
                            // el.setAttribute('color', data.color);
                            //alert("Hello! I am an" + name);
                            modal.style.display = "block";
                            document.getElementById("name").innerHTML = name;
                            document.getElementById("image").src = image_url;
                            document.getElementById("rating").innerHTML = "ocena obiskovalcev: " + rating;
                            document.getElementById("distance").innerHTML = "zračna razdalja: " + distance.toFixed(2);

                            if (openingHours !== "")
                            document.getElementById("opening_hours").innerHTML = openingHours;


                        });


                       

                        el.appendChild(entity);


                    });

                    //parse locations
                    //  var parsed_locations = parse_location(locations);
                    // locationsString = parsed_locations;
                    //   return fetch(`https://cors.bridged.cc/https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=AIzaSyCC2aDWxhRGLni1Tz5MlhdX9-6WwX5d3kM`)
                    //  })   .then(function (response) {
                    //    response.json().then(function (data) {
                    //   console.log(data)
                    //     })
                })
            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });



    }
});

function parse_location(locations) {
    var locations_str = "";
    for (i = 0; i < locations.length; i++) {
        if (i < locations.length - 1) locations_str = locations_str + locations[i][0] + "," + locations[i][1] + "|"
        else locations_str = locations_str + locations[i][0] + "," + locations[i][1]
    }
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}


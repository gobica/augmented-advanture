//const { connect } = require("http2");

AFRAME.registerComponent('peakfinder', {
    init: function () {
        this.loaded = false;
        window.addEventListener('gps-camera-update-position', e => {
            if (this.loaded === false) {
                this._loadPeaks(e.detail.position.longitude, e.detail.position.latitude);
                this.loaded = true;
                console.log("zakaj ne delas, a? zakva", this.el)

            }
        });
    },

    _loadPeaks: function (longitude, latitude) {
        const scale = 300;
        var el = this.el;

        // fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&key=AIzaSyCC2aDWxhRGLni1Tz5MlhdX9-6WwX5d3kM`)
             fetch('/example.json' ) 
             .then(
                 function (response) {

                     if (response.status !== 200) {
                         console.log('Looks like there was a problem. Status Code: ' +
                             response.status);
                         return;
                     }
                     // response from API 
                     response.json().then(function (data) {
                     console.log(data.results)
                      //  datas = data.results.filter(result =>  result.name = ))
                      data.results.forEach(element => {
                        console.log(element.name)
                        const entity = document.createElement('a-text');
                        entity.setAttribute('look-at', '[gps-projected-camera]');
                        entity.setAttribute('value', element.name);
                        entity.setAttribute('scale', {
                            x: scale,
                            y: scale,
                            z: scale
                        });
                        console.log(element.geometry.location.lat)
                        console.log(element.geometry.location.lng)

                        entity.setAttribute('gps-projected-entity-place', {
                            latitude: element.geometry.location.lat,
                            longitude: element.geometry.location.lng
                        });
                        el.appendChild(entity);
                      });
                         
                     });
                 }
             )
             .catch(function (err) {
                 console.log('Fetch Error :-S', err);
             });

     }
 });
 
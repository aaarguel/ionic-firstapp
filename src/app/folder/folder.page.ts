import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
declare var google;
function getAddressStart(latlng) {
  var geoCoder = new google.maps.Geocoder;
  geoCoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        localStorage.setItem('addressStart', results[0].formatted_address)
        // console.log(localStorage.getItem('addressStart'))
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
function getAddressEnd(latlng) {
  var geoCoder = new google.maps.Geocoder;
  geoCoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        localStorage.setItem('addressEnd', results[0].formatted_address)
        // console.log(localStorage.getItem('addressEnd'))
      } else {
        // window.alert('No results found');
      }
    } else {
      // window.alert('Geocoder failed due to: ' + status);
    }
  });
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage {

  lat = 0;
  lng = 0;
  marker: any;
  map: any;
  latStore = -2.104;
  lngStore = -79.896;
  geoCoder: any;
  markerStore: any;
  directionsService: any;
  directionsRenderer: any;
  constructor(private geolocation: Geolocation,
    private loadingCtrl: LoadingController) {
    
  }

  ngOnInit(){
    this.initMap();
  }

  async initMap(){
    this.ubicate();
  }

  addMaker(lat: number, lng: number) {
    var image = {
      url: 'https://pngimage.net/wp-content/uploads/2018/06/online-store-png-6.png',
      size: new google.maps.Size(100, 100),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(34, 72),
      scaledSize: new google.maps.Size(50, 50)
    };
    this.marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      draggable:true
    });
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
    this.markerStore = new google.maps.Marker({
      position: { lat: this.latStore, lng: this.lngStore },
      map: this.map,
      draggable:false,
      icon: image
    });
    var latlng = {lat: Number(this.latStore), lng: Number(this.lngStore)};
    getAddressEnd(latlng);
    google.maps.event.addListener(this.marker, 'dragend', function (event) {
      var latlng = {lat: Number(event.latLng.lat()), lng: Number(event.latLng.lng())};
      getAddressStart(latlng);
    });
  };


  traceRoute(directionsService, directionsRenderer) {
    if (localStorage.getItem('addressStart') && localStorage.getItem('addressEnd')){
      directionsService.route(
        {
          origin: localStorage.getItem('addressStart'),
          destination:localStorage.getItem('addressEnd'),
          travelMode: 'DRIVING'
        },
        function(response, status) {
          console.log(response)
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
            console.log(this.map.marker)
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    }
  }
  async getLocation(){
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  async ubicate(){
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: myLatLng,
      zoom: 10
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      loading.dismiss();
      this.lat = myLatLng.lat;
      this.lng = myLatLng.lng;
      var latlng = {lat: Number(myLatLng.lat), lng: Number(myLatLng.lng)};
      getAddressStart(latlng);
      this.addMaker(this.lat, this.lng);
    });
  }
}
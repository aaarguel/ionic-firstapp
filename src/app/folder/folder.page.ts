import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage {

  map: any;
  constructor(private geolocation: Geolocation,
    private loadingCtrl: LoadingController) {
    
  }

  ngOnInit(){
    this.initMap();
  }

  async initMap(){
    this.ubiccate();
  }

  private addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,      
    });
  }

  async getLocation(){
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  async ubiccate(){
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: myLatLng,
      zoom: 17
    });

    google.maps.event
    .addListenerOnce(this.map, 'idle', () => {
      loading.dismiss();
      this.addMaker(myLatLng.lat, myLatLng.lng);
    });
  }
  

}
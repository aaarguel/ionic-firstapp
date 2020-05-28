import { Component, ViewChild } from '@angular/core';
declare var google;

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage {

  map: any;
  constructor() {
    
  }

  ngOnInit(){
    this.initMap();
  }

  initMap(){
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  }

}
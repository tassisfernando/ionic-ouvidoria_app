import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';


import { Coordinates, Geolocation } from '@ionic-native/geolocation/';

declare var google;


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  map: any;
  mapa: string;
  location: Coordinates;


  constructor(private geolocation: Geolocation, private platform: Platform) { 
    this.mapa = this.getStaticMap();
  }

  ionViewDidLoad() {

    this.getLocation();

    //MAPA ESTÀTICO
    //this.mapa = this.getStaticMap();

    //this.getDinamicMap();

  }

  async getLocation() {
    await this.platform.ready();
    const { coords } = await this.geolocation.getCurrentPosition();
    this.location = coords;

    this.getCurrentMap(this.location);
  }

  getCurrentMap(location: Coordinates){
    //Localização atual
      const position = new google.maps.LatLng(location.latitude, location.longitude);
 
      const mapOptions = {
        zoom: 18,
        center: position
      }
 
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
 
      const marker = new google.maps.Marker({
        position: position,
        map: this.map
      });

  }

  getDinamicMap(){
    //Mapa dinamico de uma localização predeterminada
    const position = new google.maps.LatLng(-19.538793, -42.649870);
    
    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: false
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,

      //Titulo
      title: 'Minha posição',

      //Animção
      animation: google.maps.Animation.BOUNCE, // OU BOUNCE

      //Icone
      //icon: 'assets/imgs/pessoa.png'
    });   
    
  }

  getEndereco() {
    return 'Avenida Brasil' + ', ' + '1000' + ' - ' + 'Iguaçu' + ', ' + 'Ipatinga' + ' - ' + 'MG';
  }


 
  getStaticMap() {
    return 'https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=400x400&markers=color:red|' + this.getEndereco() + '&key=AIzaSyAcm3zQqelJL9GQ8OmjOnXqtvThsP1roDk';
  }
}

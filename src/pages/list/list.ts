import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var google;


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  map: any;
  mapa: string;


  constructor(public navCtrl: NavController, public navParams: NavParams) { 
    this.mapa = this.getEndereco();
  }

  ionViewDidLoad() {

    this.mapa = this.getEndereco();

    const position = new google.maps.LatLng(-21.763409, -43.349034);
 
    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: true
    }
 
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
 
    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
 
      //Titulo
      title: 'Minha posição',
 
      //Animção
      //animation: google.maps.Animation.DROP, // BOUNCE
 
      //Icone
      //icon: 'assets/imgs/pessoa.png'
    });
  }

  getEndereco() {
    return 'Avenida Jovino Augusto da Silva' + ', ' + '72' + ' - ' + 'Bromélias' + ', ' + 'Timóteo' + ' - ' + 'MG';
  }
 
  getMapa() {
    return 'https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=400x400&markers=color:red|' + this.getEndereco() + 'AIzaSyDHw5MqJSOxnLvLYmnluEYqS6WSAvtGXOw';
  }
}

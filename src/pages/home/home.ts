import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import {ManifestacaoPage} from '../manifestacao/manifestacao';
import { MinhasManifestacoesPage } from '../minhas-manifestacoes/minhas-manifestacoes';
import { UsuarioPage } from './../usuario/usuario';
import { LocalInfoPage } from './../local-info/local-info';
import { TabsPage } from './../tabs/tabs';


import { Network } from  '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tipo:any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private network: Network,
    public alertCtrl: AlertController) {
  }

  ionViewDidEnter(){
    this.checkConnection();
  }

  checkConnection(){
    this.network.onDisconnect().subscribe(() => {
      this.criarAlert("Falha de conexão!", "Você não está conectado à internet. Sua experiência no app será afetada!", ['OK']);
    });

    this.network.onConnect().subscribe(() => {
      console.log('conectado!');
    });
  }

  criarAlert(title: string, subTitle: string, buttons: string[]) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  abrirPagina(x: number){
    this.navCtrl.push(ManifestacaoPage, {
      item: x
    });
    console.log(x);
  }

  abrirUsuarioPage(){
    this.navCtrl.push(UsuarioPage);
  }

  abrirManifestacaoPage(){
    this.navCtrl.push(TabsPage);
    let loader = this.loadingCtrl.create({
      content: "Carregando...",
      duration: 1500,
      spinner: 'crescent'
    });
    loader.present();
  }

  abrirLocalInfoPage(){
    this.navCtrl.push(LocalInfoPage, {usuario: null});
  }
}

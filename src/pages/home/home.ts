import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';

import {ManifestacaoPage} from '../manifestacao/manifestacao';
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
  hasConnection: boolean;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private network: Network,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
      this.hasConnection = true;
  }

  ionViewDidEnter(){
    this.checkConnection();
  }

  reloadPage(){
    this.checkConnection();
  }

  checkConnection(){
    this.network.onDisconnect().subscribe(() => {
      if(this.hasConnection){
        this.presentToast('Não há conexão com a internet.')
      }
      this.hasConnection = false;
    });

    this.network.onConnect().subscribe(() => {
      console.log('conectado!');
      if(!this.hasConnection){
        this.presentToast('Conectado!');
      }
      this.hasConnection = true;
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2500,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
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

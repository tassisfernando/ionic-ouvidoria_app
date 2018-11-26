import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ManifestacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manifestacao',
  templateUrl: 'manifestacao.html',
})
export class ManifestacaoPage {



  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManifestacaoPage');
  }

  voltarPaginaInicial(){
    this.navCtrl.push(HomePage);
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Manifestação Enviada com Sucesso',
      duration: 3000
    });
    toast.present();

    this.voltarPaginaInicial();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Manifestação Enviada com sucesso',
      subTitle: 'A sua manifestção foi enviada e armazenada na aba "Minhas manifestações"!',
      buttons: ['OK']
    });
    alert.present();
    this.voltarPaginaInicial();
  }
  
}

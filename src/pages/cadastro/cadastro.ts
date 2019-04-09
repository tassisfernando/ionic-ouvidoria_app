import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {ManifestacaoPage} from '../manifestacao/manifestacao'
import { HomePage } from '../home/home';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public toggle:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  fecharCadastro(){
    this.navCtrl.setRoot(ManifestacaoPage);
  }

  voltarPaginaInicial(){
    this.navCtrl.setRoot(HomePage);
  }

  continuar(){
    this.toggle = true;
    this.navCtrl.setRoot(ManifestacaoPage);
   
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Cadastro Efetuado com Sucesso',
      duration: 3000
    });
    this.toggle=true;
    toast.present();
    this.continuar();
  }
}

import { ISecretaria } from './../../interfaces/ISecretaria';
import { ITipo } from './../../interfaces/ITipo';
import { IManifestacao } from './../../interfaces/IManifestacao';
import { IManifestante } from './../../interfaces/IManifestante';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LocalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-local-info',
  templateUrl: 'local-info.html',
})
export class LocalInfoPage {

  private usuario: IManifestante;
  private tipos: ITipo[];
  private secretarias: ISecretaria[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.usuario = navParams.get('usuario');

    console.log(this.usuario);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalInfoPage');
  }

}

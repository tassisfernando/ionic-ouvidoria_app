import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) { }

  ionViewDidEnter(){
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

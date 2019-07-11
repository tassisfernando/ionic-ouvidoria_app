import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {ManifestacaoPage} from '../manifestacao/manifestacao';
import { MinhasManifestacoesPage } from '../minhas-manifestacoes/minhas-manifestacoes';
import { UsuarioPage } from './../usuario/usuario';
import { LocalInfoPage } from './../local-info/local-info';

import { Network } from  '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tipo:any;

  constructor(public navCtrl: NavController) { }

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
    this.navCtrl.push(MinhasManifestacoesPage);
  }

  abrirLocalInfoPage(){
    this.navCtrl.push(LocalInfoPage, {usuario: null});
  }
}

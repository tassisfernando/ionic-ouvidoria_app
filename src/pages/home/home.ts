import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ManifestacaoPage} from '../manifestacao/manifestacao';
import { MinhasManifestacoesPage } from '../minhas-manifestacoes/minhas-manifestacoes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  abrirPagina(){
    //this.navCtrl.push(ManifestacaoPage);
    this.navCtrl.push(ManifestacaoPage);
  }

  abrirManifestacaoPage(){
    this.navCtrl.push(MinhasManifestacoesPage);
  }

}

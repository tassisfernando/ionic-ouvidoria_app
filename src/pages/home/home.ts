import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ManifestacaoPage} from '../manifestacao/manifestacao';
import { MinhasManifestacoesPage } from '../minhas-manifestacoes/minhas-manifestacoes';
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

  abrirManifestacaoPage(){
    this.navCtrl.push(MinhasManifestacoesPage);
  }

  buscaTipo(){
    //ADICIONAR NO STORAGE O TIPO DE MANIFESTAÇÃO E SELECIONAR ELA NA PAGINA DE CRIAR MANIFESTAÇÃO
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ManifestacaoPage} from '../manifestacao/manifestacao';
import { MinhasManifestacoesPage } from '../minhas-manifestacoes/minhas-manifestacoes';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tipo:any;
  

  constructor(public navCtrl: NavController) {

  }


  ionViewDidEnter(){
   console.log("Entrou na Pagina Home")
  }

  abrirPagina(x){
    this.navCtrl.push(ManifestacaoPage, {
      item: x
    });
    console.log(x);
  }

  abrirManifestacaoPage(){
    this.navCtrl.push(MinhasManifestacoesPage);
  }

  buscaTipo(){

  }

}

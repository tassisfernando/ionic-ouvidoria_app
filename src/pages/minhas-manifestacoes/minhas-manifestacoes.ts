import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { IManifestacao } from '../../interfaces/IManifestacao';
import { IAssunto } from '../../interfaces/IAssunto';


/**
 * Generated class for the MinhasManifestacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-minhas-manifestacoes',
  templateUrl: 'minhas-manifestacoes.html',
})
export class MinhasManifestacoesPage {

  manifestacoes: IManifestacao[];
  assunto: IAssunto;
  found: boolean;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public restProvider: RestProvider) {
    this.getManifestacoes();
    this.found = false;
  }


  //VAI TER QUE SER GETMANIFESTAÇÕES POR PROTOCOLO, ENTÃO O FILTRO VAI TER QUE FUNCIONAR
  getManifestacoes() {
    this.restProvider.getMinhasManifestações()
      .then(data => {
        this.manifestacoes = data;
        console.log(this.manifestacoes);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhasManifestacoesPage');
  }

  //IMPLEMENTAR O GET ITEMS PARA O SEARCHBAR FUNCIONAR
  getItems(ev: any) {

    // Reset items back to all of the items
    //this.getManifestacoes();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.manifestacoes = this.manifestacoes.filter((manifestacao) => {
        return (manifestacao.hash.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      if(this.manifestacoes.length > 0){
        this.found = true;
      }else{
        this.found = false;
      }
    } else{
      this.getManifestacoes();
      this.found = false;
    }
  }

  getManifestacaoPorProtocolo(protocolo: number){
    this.restProvider.getManifestacaoPorProtocolo(protocolo)
      .then(data => {
        console.log(data);
        return data;
    });
    return null;
  }
}

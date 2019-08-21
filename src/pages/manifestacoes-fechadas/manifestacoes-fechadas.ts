import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ManifestacaoProvider } from '../../providers/manifestacao/manifestacao';
import { StorageProvider } from './../../providers/storage/storage';

import { IManifestacao } from '../../interfaces/IManifestacao';
import { IAssunto } from '../../interfaces/IAssunto';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ManifestacoesFechadasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manifestacoes-fechadas',
  templateUrl: 'manifestacoes-fechadas.html',
})
export class ManifestacoesFechadasPage {
  manifestacoes: IManifestacao[];
  manifestacoesStorage: IManifestacao[];
  assunto: IAssunto;
  found: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public manifestacaoProvider: ManifestacaoProvider,
    public storageProvider: StorageProvider) {
   this.found = false;
 }


 ionViewDidLoad() {
  this.getManifestacoesStorage();
  this.getManifestacoes();
}

  getManifestacoesStorage(){
    this.storageProvider.getStorage('manifestacoes').then((data) => {
      this.manifestacoesStorage = data;

      console.log("Manifestacoes", data)
    });
  }

  //VAI TER QUE SER GETMANIFESTAÇÕES POR PROTOCOLO, ENTÃO O FILTRO VAI TER QUE FUNCIONAR
  getManifestacoes() {
    this.manifestacaoProvider.getMinhasManifestações()
      .then(data => {
        if(data){
          this.manifestacoes = data;
        }
        console.log(this.manifestacoes);
      }).catch((err) => {
        this.showAlert('Erro de conexão', 'Estamos com problemas de conexão com o servidor. Tente novamente mais tarde.')
      });
  }

  //IMPLEMENTAR O GET ITEMS PARA O SEARCHBAR FUNCIONAR
  getItems(ev: any) {

    // Reset items back to all of the items
    //this.getManifestacoes();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if(this.manifestacoes){
      if (val && val.trim() != '') {
        this.manifestacoes = this.manifestacoes.filter((manifestacao) => {
          if(manifestacao.hash)
            return (manifestacao.hash.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
        if(this.manifestacoes.length > 0){
          this.found = true;
        }else{
          this.showAlert('Nada encontrado', 'Não encontramos nada com esse protocolo.')
        }
      } else{
        this.getManifestacoes();
        this.found = false;
      }
    } else{
      this.showAlert('Erro de conexão', 'Estamos com problemas de conexão com o servidor. Tente novamente mais tarde.')
    }
  }

  abreManifestacao(manifestacao: IManifestacao){
    //this.navCtrl.push(DetalhePage, { manifestacao: manifestacao });
  }

  showAlert(title: string, subTitle: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
}

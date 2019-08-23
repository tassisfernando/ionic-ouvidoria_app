import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ManifestacaoProvider } from '../../providers/manifestacao/manifestacao';
import { StorageProvider } from './../../providers/storage/storage';

import { IManifestacao } from '../../interfaces/IManifestacao';
import { IAssunto } from '../../interfaces/IAssunto';

import { AlertController } from 'ionic-angular';

import { DetalheManifestacaoPage } from './../detalhe-manifestacao/detalhe-manifestacao';

@IonicPage()
@Component({
  selector: 'page-manifestacoes-abertas',
  templateUrl: 'manifestacoes-abertas.html',
})

export class ManifestacoesAbertasPage {

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

  getManifestacoesStorage(){
    this.storageProvider.getStorage('manifestacoes').then((data) => {
      this.manifestacoesStorage = data;

      if(data){
        for(let pos = 0; pos < this.manifestacoesStorage.length; pos++) {
          this.manifestacaoProvider.getManifestacaoPorId(this.manifestacoesStorage[pos].idManifestacao).then( data => {
            if(data){
              this.manifestacoesStorage[pos] = data;
              console.log(data);

              this.storageProvider.setStorage('manifestacoes', this.manifestacoesStorage);
            }
          }).catch( err => {
            console.log(err);
          });
        }
      }

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhasManifestacoesPage');
    this.getManifestacoesStorage();
    this.getManifestacoes();
  }

  ionViewWillEnter(){
    this.getManifestacoesStorage();
    this.getManifestacoes();
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
    this.navCtrl.push(DetalheManifestacaoPage, { manifestacao: manifestacao });
  }

  showAlert(title: string, subTitle: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  //Não estou usando
  getManifestacaoPorProtocolo(protocolo: number){
    this.manifestacaoProvider.getManifestacaoPorProtocolo(protocolo)
      .then(data => {
        console.log(data);
        return data;
    });
    return null;
  }
}




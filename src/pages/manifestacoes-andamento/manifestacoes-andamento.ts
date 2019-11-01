import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ManifestacaoProvider } from '../../providers/manifestacao/manifestacao';
import { StorageProvider } from './../../providers/storage/storage';

import { DetalheManifestacaoPage } from './../detalhe-manifestacao/detalhe-manifestacao';

import { IManifestacao } from '../../interfaces/IManifestacao';
import { IAssunto } from '../../interfaces/IAssunto';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-manifestacoes-andamento',
  templateUrl: 'manifestacoes-andamento.html',
})
export class ManifestacoesAndamentoPage {

  manifestacoes: IManifestacao[];
  manifestacoesBd: IManifestacao[];
  manifestacoesStorage: IManifestacao[] = [];
  assunto: IAssunto;
  found: boolean;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController,
     public manifestacaoProvider: ManifestacaoProvider,
     public storageProvider: StorageProvider) {
    this.found = false;
  }

  //método executado quando a página é carregada
  ionViewDidLoad() {
    this.getManifestacoes();
    this.manifestacoes = this.manifestacoesBd;
  }

  //método executado quando a página vai ser construída
  ionViewWillEnter(){
    this.getManifestacoesStorage();
  }

  //recupera todas as manifestações do BD
  getManifestacoes() {
    this.manifestacaoProvider.getMinhasManifestações()
      .then(data => {
        if(data){
          this.manifestacoesBd = data;
          this.manifestacoes = this.manifestacoesBd;
          this.atualizaStorage();
        }
        console.log(this.manifestacoesBd);
      }).catch((err) => {
        this.showAlert('Erro de conexão', 'Estamos com problemas de conexão com o servidor. Tente novamente mais tarde.')
      });
  }

  //recupera as manifestações armazenadas no celular do usuário
  getManifestacoesStorage(){
    this.storageProvider.getStorage('manifestacoes').then((data) => {

      if(data){
        /*let posStorage = 0;
        for(let pos = 0; pos < data.length; pos++) {
          if(data[pos].status == 'Em andamento'){
            this.manifestacoesStorage[posStorage] = data[pos];
            posStorage++;
          }
        }*/
        this.manifestacoesStorage = data;
      }

      /*if(data){
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
      }*/

      console.log("Manifestacoes", this.manifestacoesStorage)
    });
  }

  //atualiza as manifestações do storage, no caso de ter alguma mudança no BD
  atualizaStorage(){
    for (let index = 0; index < this.manifestacoesStorage.length; index++) {
      for (let j = 0; j < this.manifestacoes.length; j++) {
        if(this.manifestacoesStorage[index].idManifestacao == this.manifestacoes[j].idManifestacao){
          this.manifestacoesStorage[index] = this.manifestacoes[j];
        }
      }
    }
    this.storageProvider.setStorage('manifestacoes', this.manifestacoesStorage);
  }

  //método para funcionar a barra de pesquisa da página, filtra as manifestações por protocolo
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
        this.manifestacoes = this.manifestacoesBd;
        this.found = false;
      }
    } else{
      this.showAlert('Erro de conexão', 'Estamos com problemas de conexão com o servidor. Tente novamente mais tarde.')
    }
  }

  //abre a página de DetalheManifestacao para exibir os dados da manifestação selecionada
  abreManifestacao(manifestacao: IManifestacao){
    this.navCtrl.push(DetalheManifestacaoPage, { manifestacao: manifestacao, manifestacoesStorage: this.manifestacoesStorage });
  }

  //Cria um alert com um texto de ajuda ao usuário
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


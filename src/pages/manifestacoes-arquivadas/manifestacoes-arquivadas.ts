import { DetalheManifestacaoPage } from './../detalhe-manifestacao/detalhe-manifestacao';
import { ManifestacaoProvider } from './../../providers/manifestacao/manifestacao';
import { IAssunto } from './../../interfaces/IAssunto';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { IManifestacao } from '../../interfaces/IManifestacao';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-manifestacoes-arquivadas',
  templateUrl: 'manifestacoes-arquivadas.html',
})
export class ManifestacoesArquivadasPage {

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

  //método executado quando a página vai ser construída
  ionViewWillEnter(){
    this.getManifestacoes();
    console.log(this.manifestacoes);
  }

  //recupera todas as manifestações do BD
  getManifestacoes() {
    this.storageProvider.getStorage('manifestacoesArquivadas').then((data) => {
      if(data){
        this.manifestacoes = data;
      }
    });

    this.storageProvider.getStorage('manifestacoes').then((data) => {
      if(data){
        this.manifestacoesStorage = data;
      }
    });
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
        this.getManifestacoes();
        this.found = false;
      }
    } else{
      this.showAlert('Erro de conexão', 'Estamos com problemas de conexão com o servidor. Tente novamente mais tarde.')
    }
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

  //abre a página de DetalheManifestacao para exibir os dados da manifestação selecionada
  abreManifestacao(manifestacao: IManifestacao){
    this.navCtrl.push(DetalheManifestacaoPage, { manifestacao: manifestacao, manifestacoesStorage: this.manifestacoesStorage });
  }

}

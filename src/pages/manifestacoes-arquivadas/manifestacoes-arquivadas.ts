import { DetalheManifestacaoPage } from './../detalhe-manifestacao/detalhe-manifestacao';
import { ManifestacaoProvider } from './../../providers/manifestacao/manifestacao';
import { IAssunto } from './../../interfaces/IAssunto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IManifestacao } from '../../interfaces/IManifestacao';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the ManifestacoesArquivadasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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

  ionViewWillEnter(){
    this.getManifestacoes();
    console.log(this.manifestacoes);
  }

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

  showAlert(title: string, subTitle: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  abreManifestacao(manifestacao: IManifestacao){
    this.navCtrl.push(DetalheManifestacaoPage, { manifestacao: manifestacao, manifestacoesStorage: this.manifestacoesStorage });
  }

}

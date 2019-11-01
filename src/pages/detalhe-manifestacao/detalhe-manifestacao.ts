import { IAnexo } from './../../interfaces/IAnexo';
import { StorageProvider } from './../../providers/storage/storage';
import { ComentariosPage } from './../comentarios/comentarios';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { ManifestacaoProvider } from './../../providers/manifestacao/manifestacao';
import { ComentarioProvider } from './../../providers/comentario/comentario';
import { EnderecoProvider } from '../../providers/endereco/endereco';

import { IManifestacao } from './../../interfaces/IManifestacao';
import { IEndereco } from './../../interfaces/IEndereco';
import { IAssunto } from './../../interfaces/IAssunto';
import { ITipo } from './../../interfaces/ITipo';
import { ISecretaria } from './../../interfaces/ISecretaria';
import { IManifestante } from './../../interfaces/IManifestante';
import { IUnidade } from './../../interfaces/IUnidade';
import { IComentario } from './../../interfaces/IComentario';

@Component({
  selector: 'page-detalhe-manifestacao',
  templateUrl: 'detalhe-manifestacao.html',
})
export class DetalheManifestacaoPage {

  manifestacao: IManifestacao;
  manifestacoesStorage: IManifestacao[];
  manifestacoesArquiv: IManifestacao[] = [];
  usuario: IManifestante;
  secretaria: ISecretaria;
  tipo: ITipo;
  assunto: IAssunto;
  endereco: IEndereco;
  unidade: IUnidade;
  anexo: IAnexo;
  comentarios: IComentario[];
  isDownloaded: boolean;
  isArquivado: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public enderecoProvider: EnderecoProvider,
              public comentarioProvider: ComentarioProvider,
              public manifestacaoProvider: ManifestacaoProvider,
              public storageProvider: StorageProvider,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {


    this.manifestacoesStorage = navParams.get('manifestacoesStorage');
    console.log('Storage:', this.manifestacoesStorage);

    this.storageProvider.getStorage('manifestacoesArquivadas').then((data) => {
      this.manifestacoesArquiv = data;
      this.checkArquivada();
      console.log('Arquivadas:', this.manifestacoesArquiv);
    });

    this.manifestacao = navParams.get('manifestacao');
    this.tipo = this.manifestacao.tb_tipo;
    this.endereco = this.manifestacao.tb_endereco;
    this.assunto = this.manifestacao.tb_assunto;
    this.secretaria = this.manifestacao.tb_secretaria;
    this.anexo = this.manifestacao.tb_anexo;

    if(this.anexo){
      this.anexo.nmAnexo = this.anexo.nmAnexo.substr(this.anexo.nmAnexo.lastIndexOf('/') + 1);
    }


    this.getManifestante();

    if(this.endereco.idUnidade){
      console.log(this.endereco.idUnidade);
      this.getUnidade();
    }

    this.checkDownload();
    this.getComentarios();

    console.log('Arquivada:', this.isArquivado);
    console.log('Salva:', this.isDownloaded);
  }

  ionViewDidLoad(){
    this.checkDownload();
  }

  getManifestante(){
    this.manifestacaoProvider.getManifestantePorId(this.manifestacao.idManifestacao).then( manifestante => {
      if(manifestante){
        this.usuario = manifestante["0"];
      }
      console.log(this.usuario);
    });
  }

  getUnidade(){
    this.enderecoProvider.getUnidades(this.endereco.idUnidade).then( (unidade) => {
      if(unidade){
        this.unidade = unidade;
      }
    });
  }

  checkDownload(){
    this.isDownloaded = false;

    if(this.manifestacoesStorage){
      for (let index = 0; index < this.manifestacoesStorage.length; index++) {
        if(this.manifestacoesStorage[index].idManifestacao == this.manifestacao.idManifestacao){
          this.isDownloaded = true;
          this.isArquivado = false;
        }
      }
    }
  }

  checkArquivada(){
    this.isArquivado = false;

    if(this.manifestacoesArquiv){
      for (let index = 0; index < this.manifestacoesArquiv.length; index++) {
        if(this.manifestacoesArquiv[index].idManifestacao == this.manifestacao.idManifestacao){
          this.isArquivado = true;
          this.isDownloaded = false;
        }
      }
    }
  }

  downloadManifestacao(){
    this.storageProvider.getStorage('manifestacoes').then((data) => {
      if(data){
        this.manifestacoesStorage = data;
        this.manifestacoesStorage.push(this.manifestacao);
      } else{
        this.manifestacoesStorage.push(this.manifestacao);
      }

      this.storageProvider.setStorage('manifestacoes', this.manifestacoesStorage);
      this.isDownloaded = true;
      this.presentToast('Manifestação salva!');
    });
  }

  arquivarManifestacao(){
    this.storageProvider.getStorage('manifestacoesArquivadas').then((data) => {
      if(data){
        this.manifestacoesArquiv = data;
        this.manifestacoesArquiv.push(this.manifestacao);
      } else{
        this.manifestacoesArquiv = [];
        this.manifestacoesArquiv.push(this.manifestacao);
      }

      this.storageProvider.setStorage('manifestacoesArquivadas', this.manifestacoesArquiv);
    });
  }

  desarquivarManifestacao(){
    this.storageProvider.getStorage('manifestacoesArquivadas').then((data) => {
      if(data){
        this.manifestacoesArquiv = data;
        let pos = this.acharPosManifestacao(); //acha a posição
        this.manifestacoesArquiv.splice(pos, 1); //exclui o objeto na posição pos
      }

      this.storageProvider.setStorage('manifestacoesArquivadas', this.manifestacoesArquiv);
      this.isArquivado = false;
      this.downloadManifestacao();
    });
  }

  excluirManifestacao(){
    this.storageProvider.getStorage('manifestacoes').then((data) => {
      if(data){
        this.manifestacoesStorage = data;
        let pos = this.acharPosManifestacao(); //acha a posição
        this.manifestacoesStorage.splice(pos, 1); //exclui o objeto na posição pos
      }

      this.storageProvider.setStorage('manifestacoes', this.manifestacoesStorage);
      this.isDownloaded = false;
      this.isArquivado = true;

      this.arquivarManifestacao();
      this.presentToast('Manifestação arquivada!');
    });
  }

  acharPosManifestacao(){
    for (let i = 0; i < this.manifestacoesStorage.length; i++) {
      if(this.manifestacoesStorage[i].idManifestacao == this.manifestacao.idManifestacao){
        return i;
      }
    }
  }

  acharPosManifestacaoArquiv(){
    for (let i = 0; i < this.manifestacoesArquiv.length; i++) {
      if(this.manifestacoesArquiv[i].idManifestacao == this.manifestacao.idManifestacao){
        return i;
      }
    }
  }

  getComentarios(){
    this.comentarioProvider.getComentarios(this.manifestacao.idManifestacao).then( comentarios => {
      if(comentarios){
        this.comentarios = comentarios;
      } else{
        this.comentarios = null;
      }
    }).catch( err => {
      console.log(err);
      this.comentarios = null;
      this.criarAlert('Erro de conexão', 'Tivemos um erro de conexão com o servidor.', ['OK'])
    });
  }

  abreComentarios(){
    this.navCtrl.push(ComentariosPage, { comentarios: this.comentarios, manifestacao: this.manifestacao });
  }

  criarAlert(title: string, subTitle: string, buttons: string[]) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2500,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}

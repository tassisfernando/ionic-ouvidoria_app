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

  //método executado quando a página é carregada
  ionViewDidLoad(){
    this.checkDownload();
  }

  //recupera o manifestante no BD a partir do ID da manifestação
  getManifestante(){
    this.manifestacaoProvider.getManifestantePorId(this.manifestacao.idManifestacao).then( manifestante => {
      if(manifestante){
        this.usuario = manifestante["0"];
      }
      console.log(this.usuario);
    });
  }

  //recupera o objeto unidade da API de acordo com o ID do endereço da manifestação
  getUnidade(){
    this.enderecoProvider.getUnidades(this.endereco.idUnidade).then( (unidade) => {
      if(unidade){
        this.unidade = unidade;
      }
    });
  }

  //verifica se a manifestação está baixada no celular do usuáro
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

  //verifica se essa é uma manifestação arquivada
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

  //baixa a manifestação no celular do usuário
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

  //arquiva a manifestação (é ocultada da lista principal)
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

  //desarquiva a manifestação (volta para a lista principal)
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

  //arquiva a manifestação
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

  //achar a posição da manifestação pelo ID no vetor do Storage
  acharPosManifestacao(){
    for (let i = 0; i < this.manifestacoesStorage.length; i++) {
      if(this.manifestacoesStorage[i].idManifestacao == this.manifestacao.idManifestacao){
        return i;
      }
    }
  }

  //achar a posição da manifestação pelo ID no vetor das manifestações arquivadas
  acharPosManifestacaoArquiv(){
    for (let i = 0; i < this.manifestacoesArquiv.length; i++) {
      if(this.manifestacoesArquiv[i].idManifestacao == this.manifestacao.idManifestacao){
        return i;
      }
    }
  }

  //busca na API os comentários referentes a essa manifestação
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

  //abre a página de comentários
  abreComentarios(){
    this.navCtrl.push(ComentariosPage, { comentarios: this.comentarios, manifestacao: this.manifestacao });
  }

  //cria um alert recebendo os dados como parâmetros
  criarAlert(title: string, subTitle: string, buttons: string[]) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  //cria um toast recebendo a mensagem como parâmetro
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

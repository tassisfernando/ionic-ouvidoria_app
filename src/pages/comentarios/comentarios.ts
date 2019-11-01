import { ComentarioProvider } from './../../providers/comentario/comentario';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, Content, AlertController} from 'ionic-angular';

import { IComentario } from './../../interfaces/IComentario';
import { IManifestacao } from '../../interfaces/IManifestacao';

@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html',
})
export class ComentariosPage {
@ViewChild(Content) content: Content;

  comentarios: IComentario[];
  comentario: IComentario = { idComentario: 0, texto: '', idManifestacao: 0 };
  manifestacao: IManifestacao;

  constructor(navParams: NavParams,
              private events: Events,
              public comentarioProvider: ComentarioProvider,
              private alertCtrl: AlertController) {
      this.comentarios = navParams.get('comentarios');
      this.manifestacao = navParams.get('manifestacao');

      console.log(this.comentarios);
  }

  //atualiza o conteúdo da tela
  update(){
    this.content.resize();
  }

  //cadastra o comentário no BD e adiciona ao vetor de comentários da página
  salvarComentario(){
    if(this.comentario.texto.length >= 2){
      this.comentario.idManifestacao = this.comentarios[0].idManifestacao;

      console.log(this.comentario.idManifestacao);
      this.comentarioProvider.criarComentario(this.comentario).then( data => {
        if(data){
          data.dtInclusao = data.dtInclusao["date"];
          data.dtEdicao = data.dtEdicao["date"]

          this.comentarios.push(data);
          this.comentario.texto = "";
        }
      }).catch( err => {
        this.criarAlert('Erro', 'Erro ao cadastrar comentário. Tivemos um erro no nosso servidor. Tente novamente mais tarde', ['OK']);
      });
    }
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
}


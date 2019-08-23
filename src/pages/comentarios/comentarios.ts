import { ComentarioProvider } from './../../providers/comentario/comentario';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content, AlertController} from 'ionic-angular';

import { IComentario } from './../../interfaces/IComentario';

@IonicPage()
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html',
})
export class ComentariosPage {
@ViewChild(Content) content: Content;

  comentarios: IComentario[];
  comentario: IComentario = { idComentario: 0, texto: '', idManifestacao: 0 };

  constructor(navParams: NavParams,
              private events: Events,
              public comentarioProvider: ComentarioProvider,
              private alertCtrl: AlertController) {
      this.comentarios = navParams.get('comentarios');

      console.log(this.comentarios);
  }

  ionViewCanEnter(){

  }

  update(){
    this.content.resize();
  }

  salvarComentario(){

    if(this.comentario.texto.length >= 2){
      this.comentario.idManifestacao = this.comentarios[0].idManifestacao;

      console.log(this.comentario.idManifestacao);
      this.comentarioProvider.criarComentario(this.comentario).then( data => {
        if(data){
          data.dtInclusao = data.dtInclusao["date"];

          this.comentarios.push(data);
          this.comentario.texto = "";
        }
      }).catch( err => {
        this.criarAlert('Erro', 'Erro ao cadastrar comentário. Tivemos um erro no nosso servidor. Tente novamente mais tarde', ['OK']);
      });
    }
  }

  criarAlert(title: string, subTitle: string, buttons: string[]) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }
}


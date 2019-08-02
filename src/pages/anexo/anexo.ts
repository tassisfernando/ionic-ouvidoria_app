import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { IManifestacao } from './../../interfaces/IManifestacao';
import { IManifestante } from './../../interfaces/IManifestante';

@IonicPage()
@Component({
  selector: 'page-anexo',
  templateUrl: 'anexo.html',
})
export class AnexoPage {

  public submitAttempt: boolean = false;
  public form: FormGroup;

  usuario: IManifestante;
  manifestacao: IManifestacao = { dtEdicao: null, dtInclusao: null, idAssunto: 0, idTipo: 0, idSecretaria: 0, descricao: '', hash: '', emailAnonimo: '', tbmanifestante: null, tbendereco: { idEndereco: 0, logradouro: '', bairro: '', numero: 0, cep: '', complemento: '' } };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
  ) {

    this.usuario = navParams.get('usuario');
    this.manifestacao = navParams.get('manifestacao');

    console.log(this.manifestacao, this.usuario);

    this.form = formBuilder.group({
      descricao: ['', Validators.compose([Validators.minLength(3), Validators.required])]
    });
  }

  ionViewDidLoad() {
  }

  showDuvidas(duvida: string){

    let texto;

    if( duvida == "descricao" ){
      texto = "Na descrição você deve descrever de forma geral a manifestação e dar detalhes que não são contemplados nos outros campos.";
    } else if( duvida == "anexo" ){
      texto = "Se você quiser, adicione algum arquivo ou tire uma foto de algo que possa ajudar a detalhar sua manifestação. (APENAS UM ARQUIVO)"
    }

    this.criarAlert("Ajuda", texto, ['OK']);
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

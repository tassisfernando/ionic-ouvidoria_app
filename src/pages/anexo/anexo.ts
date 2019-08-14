import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { IManifestacao } from './../../interfaces/IManifestacao';
import { IManifestante } from './../../interfaces/IManifestante';
import { IAssunto } from './../../interfaces/IAssunto';
import { IUnidade } from './../../interfaces/IUnidade';
import { ITipo } from './../../interfaces/ITipo';
import { ISecretaria } from './../../interfaces/ISecretaria';
import { IEndereco } from './../../interfaces/IEndereco';

import { FinalizarManifestacaoPage } from './../finalizar-manifestacao/finalizar-manifestacao';

@IonicPage()
@Component({
  selector: 'page-anexo',
  templateUrl: 'anexo.html',
})
export class AnexoPage {

  public submitAttempt: boolean = false;
  public form: FormGroup;

  usuario: IManifestante;
  manifestacao: IManifestacao = { dtEdicao: null, dtInclusao: null, idAssunto: 0, idTipo: 0, idSecretaria: 0, observacao: '', hash: '', emailAnonimo: '', tbmanifestante: null, tbendereco: { idEndereco: 0, logradouro: '', bairro: '', numero: 0, cep: '', complemento: '' } };
  secretaria: ISecretaria;
  tipo: ITipo;
  unidade: IUnidade;
  assunto: IAssunto;
  endereco: IEndereco;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
  ) {

    this.form = formBuilder.group({
      descricao: ['', Validators.compose([Validators.minLength(3), Validators.required])]
    });

    this.usuario = navParams.get('usuario');
    this.manifestacao = navParams.get('manifestacao');
    this.secretaria = navParams.get('secretaria');
    this.tipo = navParams.get('tipo');
    this.unidade = navParams.get('unidade');
    this.assunto = navParams.get('assunto');
    this.endereco = navParams.get('endereco');

    console.log(this.manifestacao, this.usuario);

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

  isEnabled(){
    return this.form.invalid;
  }

  save(){

    this.submitAttempt = true;

    console.log("Manifestação: ",this.manifestacao);
    console.log("Usuário: ", this.usuario);

    if(this.form.valid){
      console.log("Dados certos!");

      //passar para a outra página
      this.navCtrl.push(FinalizarManifestacaoPage, { manifestacao: this.manifestacao, usuario: this.usuario, tipo: this.tipo, assunto: this.assunto, secretaria: this.secretaria, unidade: this.unidade, endereco: this.endereco });
    } else{
      console.log("Algo deu errado!");
      console.log(this.form.value);

      this.criarAlert("Erro", "Aconteceu um erro inesperado. Tente novamente mais tarde.", ['OK'])
    }
  }
}

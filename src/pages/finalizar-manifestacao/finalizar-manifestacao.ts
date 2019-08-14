import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { IManifestante } from './../../interfaces/IManifestante';
import { IManifestacao } from './../../interfaces/IManifestacao';
import { IAssunto } from './../../interfaces/IAssunto';
import { IUnidade } from './../../interfaces/IUnidade';
import { ITipo } from './../../interfaces/ITipo';
import { ISecretaria } from './../../interfaces/ISecretaria';
import { IEndereco } from './../../interfaces/IEndereco';

import { HomePage } from './../home/home';

import { ManifestacaoProvider } from './../../providers/manifestacao/manifestacao';

@IonicPage()
@Component({
  selector: 'page-finalizar-manifestacao',
  templateUrl: 'finalizar-manifestacao.html',
})
export class FinalizarManifestacaoPage {

  public submitAttempt: boolean = false;
  public form: FormGroup;

  usuario: IManifestante;
  manifestacao: IManifestacao = { dtEdicao: null, dtInclusao: null, idAssunto: 0, idTipo: 0, idSecretaria: 0, observacao: '', hash: '', emailAnonimo: '', tbmanifestante: null, tbendereco: { idEndereco: 0, logradouro: '', bairro: '', numero: 0, cep: '', complemento: '' } };
  secretaria: ISecretaria;
  tipo: ITipo;
  unidade: IUnidade;
  assunto: IAssunto;
  endereco: IEndereco = { bairro: "", cep: "", complemento: "", idEndereco: 0, logradouro: "", numero: 0 };

  hasEmail: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              private manifestacaoProvider: ManifestacaoProvider,
              public alertCtrl: AlertController) {

    this.form = formBuilder.group({
      emailAnonimo: ['', Validators.email]
    });

    this.usuario = navParams.get('usuario');
    this.manifestacao = navParams.get('manifestacao');
    this.secretaria = navParams.get('secretaria');
    this.tipo = navParams.get('tipo');
    this.unidade = navParams.get('unidade');
    this.assunto = navParams.get('assunto');
    this.endereco = navParams.get('endereco');

    console.log(this.endereco);

  }

  isEnabled(){
    if(this.hasEmail){
      if(this.form.valid){
        return false;
      } else{
        return true;
      }
    } else{
      return false;
    }
  }

  save(){
    if(this.usuario){
      this.manifestacao.tbmanifestante = this.usuario;
    } else {
      this.manifestacao.tbmanifestante = null;
    }

    this.manifestacao.idAssunto = 27; //TIRAR ISSO AQUI DEPOISSSSS

    this.manifestacaoProvider.criarManifestacao(this.manifestacao).then(data => {
      console.log("cadastrou", data);
      this.manifestacao = data;
      console.log(this.manifestacao.hash);
      this.criarAlert('Sucesso', `A sua manifestação foi enviada e armazenada na aba "Minhas manifestações"! O seu número de protocolo é: `+this.manifestacao.hash, ['OK']);
      this.voltarPaginaInicial();
    }).catch( (err) => {
      this.criarAlert('Erro', `A sua manifestação não foi cadastrada por um erro técnico. Tente novamente mais tarde.` , ['OK'])
    });
  }

  criarAlert(title: string, subTitle: string, buttons: string[]) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinalizarManifestacaoPage');
  }

  voltarPaginaInicial() {
    this.navCtrl.setRoot(HomePage);
  }

}

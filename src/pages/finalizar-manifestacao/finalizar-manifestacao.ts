import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
import { StorageProvider } from './../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-finalizar-manifestacao',
  templateUrl: 'finalizar-manifestacao.html',
})
export class FinalizarManifestacaoPage {

  public submitAttempt: boolean = false;
  public form: FormGroup;

  usuario: IManifestante;
  manifestacoesStorage: IManifestacao[] = [];
  manifestacao: IManifestacao = { dtEdicao: null, dtInclusao: null, idAssunto: 0, idTipo: 0, idSecretaria: 0, observacao: '', hash: '', emailAnonimo: '', tbmanifestante: null, tbendereco: { idEndereco: 0, logradouro: '', bairro: '', numero: '', cep: '', complemento: '' } };
  secretaria: ISecretaria;
  tipo: ITipo;
  unidade: IUnidade;
  assunto: IAssunto;
  endereco: IEndereco = { bairro: "", cep: "", complemento: "", idEndereco: 0, logradouro: "", numero: "" };

  hasEmail: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              private manifestacaoProvider: ManifestacaoProvider,
              public alertCtrl: AlertController,
              private storageProvider: StorageProvider,
              public loadingCtrl: LoadingController) {

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

    let loader = this.loadingCtrl.create({
      content: "Cadastrando...",
      duration: 1500,
      spinner: 'crescent'
    });

    this.manifestacaoProvider.criarManifestacao(this.manifestacao).then(data => {
      console.log("cadastrou", data);
      this.manifestacao = data;

      //pega a manifestacao cadastrada com os outros campos do banco
      this.manifestacaoProvider.getManifestacaoPorId(this.manifestacao.idManifestacao).then(manifestacao => {
        this.manifestacao = manifestacao;

        //cadastra a manifestacação no celular
        this.storageProvider.getStorage('manifestacoes').then((data) => {
          if(data){
            this.manifestacoesStorage = data;
            this.manifestacoesStorage.push(this.manifestacao);
          } else{
            this.manifestacoesStorage.push(this.manifestacao);
          }

          console.log('Storage', data);
          this.storageProvider.setStorage('manifestacoes', this.manifestacoesStorage);
        });
      }).catch( (err) => {
        console.log(err)
      });

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

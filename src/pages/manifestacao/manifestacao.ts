import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';

import {HttpClient} from '@angular/common/http';

import { ITipo } from '../../interfaces/ITipo';
import { ISecretaria } from '../../interfaces/ISecretaria';
import { IAssunto } from '../../interfaces/IAssunto';
import { IUnidade } from '../../interfaces/IUnidade';
import { IManifestacao } from '../../interfaces/IManifestacao';

@IonicPage()
@Component({
  selector: 'page-manifestacao',
  templateUrl: 'manifestacao.html',
})

export class ManifestacaoPage {

  manifestacao: IManifestacao = { idassunto: 0, idtipo: 0, idunidade: 0, idsecretaria: 0, observacao: ''};
  secretarias: ISecretaria[];
  assuntos: IAssunto[];
  unidades : IUnidade[];
  tipos:ITipo[];
  selectedItem: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public restProvider: RestProvider,
    public http:HttpClient) {
      this.getTipos();
      this.getSecretarias();
      this.getAssuntos();
      this.getUnidades();
      this.selectedItem = navParams.get('item');
      this.manifestacao.idtipo = this.selectedItem; 
  }

  getTipos() {
    this.restProvider.getTipos()
      .then(data => {
        this.tipos = data;
        console.log(this.tipos);
      });
  }

  getSecretarias() {
    this.restProvider.getSecretarias()
      .then(data => {
        this.secretarias = data;
        console.log(this.secretarias);
      });
  }

  getAssuntos() {
    this.restProvider.getAssuntos()
      .then(data => {
        this.assuntos = data;
        console.log(this.assuntos);
      });
  }

  getUnidades() {
    this.restProvider.getUnidades()
      .then(data => {
        this.unidades = data;
        console.log(this.unidades);
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ManifestacaoPage');
    console.log(this.selectedItem);
  }

  voltarPaginaInicial() {
    this.navCtrl.setRoot(HomePage);
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Manifestação Enviada com Sucesso',
      duration: 3000
    });
    toast.present();

    this.voltarPaginaInicial();
  }

  criarManifestacao(){
    this.restProvider.criarManifestacao(this.manifestacao)
      .then(data => {
        this.selectUltimaManifestacao();
        console.log("Cadastrou!");
      });
  }

  selectUltimaManifestacao(){
    this.restProvider.getUltimaManifestacao().then(data => {
      this.manifestacao.idManifestacao = data["0"]["MAX(idManifestacao)"]; //TA RETORNANDO UNDEFINED
      this.showAlert();
    });
  }

  showAlert() {
    if(this.manifestacao.idManifestacao != 0){
      const alert = this.alertCtrl.create({
        title: 'Manifestação Enviada com sucesso',
        subTitle: 'A sua manifestação foi enviada e armazenada na aba "Minhas manifestações"! O seu número de protocolo é: '+this.manifestacao.idManifestacao,
        buttons: ['OK']
      });
      alert.present();
    } else{
      const alert = this.alertCtrl.create({
        title: 'Erro ao cadastrar manifestação!',
        subTitle: 'A sua manifestação não foi cadastrada por um erro técnico. Tente novamente mais tarde.',
        buttons: ['OK']
      });
      alert.present();
    }
    this.voltarPaginaInicial();
  }


  showDuvidas() {
    const alert = this.alertCtrl.create({
      title: 'Descrição',
      subTitle: 'Texto para ajudar o usuário',
      buttons: ['OK']
    });
    alert.present();
  }

  //Selecionando o tipo passado por parâmetro
  isSelected(tipo: ITipo){
    if(tipo.idTipo == this.selectedItem){
      return "true";
    } else{
      return "false";
    }
  }

  selectTipo(event,tipo:ITipo){
    console.log(tipo.idTipo);
    this.manifestacao.idtipo=tipo.idTipo;
  }

  selectSecretaria(event,secretaria:ISecretaria){
    console.log(secretaria.idSecretaria);
    this.manifestacao.idsecretaria=secretaria.idSecretaria;
  }

  selectAssunto(event,assunto:IAssunto){
    console.log(assunto.idAssunto);
    this.manifestacao.idassunto=assunto.idAssunto;
  }

  selectUnidade(event,unidade:IUnidade){
    console.log(unidade.idUnidade);
    this.manifestacao.idunidade=unidade.idUnidade;
  }

 
  
}

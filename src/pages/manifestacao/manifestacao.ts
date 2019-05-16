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

//import {Md5} from 'ts-md5/dist/md5';
import { IManifestante } from '../../interfaces/IManifestante';
import { IEndereco } from '../../interfaces/IEndereco';


@IonicPage()
@Component({
  selector: 'page-manifestacao',
  templateUrl: 'manifestacao.html',
})

export class ManifestacaoPage {

  manifestacao: IManifestacao = { dtEdicao: null, dtInclusao: null, idAssunto: 0, idTipo: 0, idSecretaria: 0, observacao: '', hash: '', emailAnonimo: '', tbmanifestante: null, tbendereco: { idEndereco: 0, logradouro: '', bairro: '', numero: 0, cep: '', complemento: '' } };
  manifestante: IManifestante = { nmManifestante: '', email: '', cpf_cnpj: '', rg: '', telefone: '' };
  endereco: IEndereco = { idEndereco: 0, logradouro: '', bairro: '', numero: 0, cep: '', complemento: '' };
  secretarias: ISecretaria[];
  assuntos: IAssunto[];
  unidades : IUnidade[];
  tipos:ITipo[];
  selectedItem: number;
  toggle: boolean;
  email: boolean;
  hasEndereco: boolean;
  hasUnidade: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public restProvider: RestProvider,
    public http:HttpClient) {
      this.getTipos();
      this.getSecretarias();
      this.selectedItem = navParams.get('item');
      this.manifestacao.idTipo = this.selectedItem; 

      this.toggle = false;
      this.email = false;
      this.hasEndereco = false;
      this.hasEndereco = false;
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

  ionViewDidLoad() {
    console.log(this.selectedItem);
  }

  voltarPaginaInicial() {
    this.navCtrl.setRoot(HomePage);
  }

  /*presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Manifestação Enviada com Sucesso',
      duration: 3000
    });
    toast.present();

    this.voltarPaginaInicial();
  }*/

  criarManifestacao(){
    //teste se há manifestante
      if((this.toggle) || (this.manifestante.nmManifestante != '')){
        this.manifestacao.tbmanifestante = this.manifestante;
      }
      if((this.hasEndereco) || (this.endereco.logradouro != '')){
        this.manifestacao.tbendereco = this.endereco;
      }
      this.restProvider.criarManifestacao(this.manifestacao).then(data => {
        console.log("cadastrou", data);
        this.manifestacao = data;
        console.log(this.manifestacao.hash);
        this.showAlert();
      });
      
  }

  /*postManifestante(){
    this.restProvider.criarManifestante(this.manifestante)
        .then(data => {
          this.selectUltimoManifestante();
          console.log("Cadastrou Manifestante!");
    });
  }

  selectUltimoManifestante(){
    this.restProvider.getUltimoManifestante().then(data => {
      this.manifestante.idManifestante = data["0"]["MAX(idManifestante)"];
      console.log("Cheguei aqui  "+this.manifestante.idManifestante);
      this.postManifestacaoManifestante();
    });
  }

  postManifestacao(){
    this.restProvider.criarManifestacao(this.manifestacao)
        .then(data => {
          this.selectUltimaManifestacao();
          console.log("Cadastrou Manifestacao!");
    });
  }

  postManifestacaoManifestante(){
    this.restProvider.criarManifestacaoManifestante(this.manifestacao, this.manifestante.idManifestante)
        .then(data => {
          this.selectUltimaManifestacao();
          console.log("Cadastrou Manifestacao!");
    });
  }


  selectUltimaManifestacao(){
    this.restProvider.getUltimaManifestacao().then(data => {
      this.manifestacao.idManifestacao = data["0"]["MAX(idManifestacao)"];
      this.showAlert();
    });
  }*/

  showAlert() {
    if(this.manifestacao.idManifestacao != 0){
      const alert = this.alertCtrl.create({
        title: 'Manifestação Enviada com sucesso',
        subTitle: 'A sua manifestação foi enviada e armazenada na aba "Minhas manifestações"! O seu número de protocolo é: '+this.manifestacao.hash,
        buttons: ['OK']
      });
      alert.present();
      this.manifestacao.idManifestacao = 0;
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
    this.manifestacao.idTipo=tipo.idTipo;
  }

  selectSecretaria(event,secretaria:ISecretaria){
    console.log(secretaria.idSecretaria);
    this.manifestacao.idSecretaria=secretaria.idSecretaria;
    this.assuntos = secretaria.tbassunto;
    this.unidades = secretaria.tbunidade;
  }

  selectAssunto(event,assunto:IAssunto){
    console.log(assunto.idAssunto);
    this.manifestacao.idAssunto=assunto.idAssunto;
  }

  selectUnidade(event,unidade:IUnidade){
    console.log(unidade.idUnidade);
    this.restProvider.getEndereco(unidade.idUnidade).then(data => {
      console.log(data);
      this.manifestacao.tbendereco.idEndereco = data["0"]["idEndereco"];
      this.hasUnidade = true;
      console.log(this.manifestacao.tbendereco.idEndereco)
    });
  }

 
  
}

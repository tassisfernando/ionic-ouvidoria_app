import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';

import {HttpClient} from '@angular/common/http';

/**
 * Generated class for the ManifestacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manifestacao',
  templateUrl: 'manifestacao.html',
})

export class ManifestacaoPage {

  secretarias: any;
  assuntos: any;
  unidades : any;
  tipos:any;
  selectedItem: any;

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

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Manifestação Enviada com sucesso',
      subTitle: 'A sua manifestção foi enviada e armazenada na aba "Minhas manifestações"! O seu número de protocolo é: ',
      buttons: ['OK']
    });
    alert.present();
    this.criarManifestacao(this.cdtipo,this.cdsecretaria,this.cdassunto,this.cdunidade);
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

  cdtipo:any;
  cdsecretaria:any;
  cdassunto:any;
  cdunidade:any;


  selectTipo(event,tipo:any){
    console.log(tipo.idTipo);
    this.cdtipo=tipo.idTipo;
  }

  selectSecretaria(event,secretaria:any){
    console.log(secretaria.idSecretaria);
    this.cdsecretaria=secretaria.idSecretaria;
  }

  selectAssunto(event,assunto:any){
    console.log(assunto.idAssunto);
    this.cdassunto=assunto.idAssunto;
  }

  selectUnidade(event,unidade:any){
    console.log(unidade.idUnidade);
    this.cdunidade=unidade.idUnidade;
  }

  criarManifestacao(idtipo:any,cdsecretaria:any,cdassunto:any,cdunidade:any){
    this.restProvider.criarManifestacao(idtipo,cdsecretaria,cdassunto,cdunidade);
  }
  
}

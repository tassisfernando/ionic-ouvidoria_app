import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { SecretariaProvider } from './../../providers/secretaria/secretaria';
import { TipoProvider } from './../../providers/tipo/tipo';

import { IUnidade } from './../../interfaces/IUnidade';
import { IAssunto } from './../../interfaces/IAssunto';
import { ISecretaria } from './../../interfaces/ISecretaria';
import { ITipo } from './../../interfaces/ITipo';
import { IManifestacao } from './../../interfaces/IManifestacao';
import { IManifestante } from './../../interfaces/IManifestante';

/**
 * Generated class for the LocalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-local-info',
  templateUrl: 'local-info.html',
})
export class LocalInfoPage {

  public formOne: FormGroup;
  public formEnd: FormGroup;
  public submitAttempt: boolean = false;


  usuario: IManifestante;
  manifestacao: IManifestacao = { dtEdicao: null, dtInclusao: null, idAssunto: 0, idTipo: 0, idSecretaria: 0, observacao: '', hash: '', emailAnonimo: '', tbmanifestante: null, tbendereco: { idEndereco: 0, logradouro: '', bairro: '', numero: 0, cep: '', complemento: '' } };
  tipos: ITipo[];
  secretarias: ISecretaria[];
  assuntos: IAssunto[];
  unidades : IUnidade[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,
              public tipoProvider: TipoProvider,
              public secretariaProvider: SecretariaProvider,
              public formBuilder: FormBuilder) {

    this.usuario = navParams.get('usuario');

    this.formOne = formBuilder.group({
      tipo: ['', Validators.compose([Validators.min(1), Validators.required])],
      secretaria: ['', Validators.compose([Validators.min(1), Validators.required])],
      assunto: ['', Validators.compose([Validators.min(1), Validators.required])],
    });

    this.getTipos();
    this.getSecretarias();

    console.log(this.usuario);
  }

  //BUSCANDO DADOS DO BD
  getTipos(){
    this.tipoProvider.getTipos()
    .then(data => {
      if(data){
        this.tipos = data;
        console.log(this.tipos);
      }
    }).catch((err)=>{
      this.criarAlert('Erro de conexão', 'Erro ao conectar com o banco de dados. Tente novamente mais tarde.', ['OK']);
      this.voltarPaginaInicial();
    }
  );
  }

  getSecretarias(){
    this.secretariaProvider.getSecretarias()
    .then(data => {
      this.secretarias = data;
      console.log(this.secretarias);
    }).catch((err) => {
      this.criarAlert('Erro inesperado', 'Houve um erro inesperado de conexão. Tente novamente mais tarde.', ['OK'])
    });
  }

  //SELECIONANDO ITEM DA
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

  criarAlert(title: string, subTitle: string, buttons: string[]) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  save(){
    this.submitAttempt = true;

    console.log(this.usuario);

    //se tiver erro em algum dos dois formulário não salva
    if(!this.formOne.valid || !this.formEnd.valid){
        console.log("Erro nos dados!");
        console.log(this.formOne.value);
    }
    else {
        console.log("Dados certos!")
        console.log(this.formOne.value);
        //passar para a outra página
        this.navCtrl.push(LocalInfoPage, {usuario: this.usuario});
    }
  }

  showDuvidas(duvida: string){

    let texto;

    if( duvida == "tipo" ){
      texto = "O tipo da manifestação define genericamente seu propósito: criticar, elogiar, denunciar etc.";
    } else if ( duvida == "secretaria" ) {
      texto = "A secretaria é o órgão da prefeitura sobre o qual você quer dizer algo.";
    } else if( duvida == "assunto" ) {
      texto = "O assunto especifica qual será o foco da sua manifestação, de acordo com a secretaria escolhida."
    }

    this.criarAlert("Ajuda", texto, ['OK']);

  }


  voltarPaginaInicial() {
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
  }

}

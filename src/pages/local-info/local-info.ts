import { Geolocation } from '@ionic-native/geolocation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { SecretariaProvider } from './../../providers/secretaria/secretaria';
import { TipoProvider } from './../../providers/tipo/tipo';
import { EnderecoProvider } from '../../providers/endereco/endereco';
import { ServicesProvider } from './../../providers/services/services';

import { AnexoPage } from './../anexo/anexo';
import { HomePage } from './../home/home';

import { IUnidade } from './../../interfaces/IUnidade';
import { IAssunto } from './../../interfaces/IAssunto';
import { ISecretaria } from './../../interfaces/ISecretaria';
import { ITipo } from './../../interfaces/ITipo';
import { IManifestacao } from './../../interfaces/IManifestacao';
import { IManifestante } from './../../interfaces/IManifestante';
import { IEndereco } from './../../interfaces/IEndereco';

@Component({
  selector: 'page-local-info',
  templateUrl: 'local-info.html',
})
export class LocalInfoPage {

  public formOne: FormGroup;
  public formEnd: FormGroup;
  public submitAttempt: boolean = false;


  usuario: IManifestante;
  manifestacao: IManifestacao = { dtEdicao: null, dtInclusao: null, idAssunto: 0, idTipo: 0, idSecretaria: 0, observacao: '', hash: '', emailAnonimo: '', tb_manifestante: null, tb_endereco: { idEndereco: 0, logradouro: '', bairro: '', numero: '', cep: '', complemento: '' } };

  tipos: ITipo[];
  tipo: ITipo;

  secretarias: ISecretaria[];
  secretaria: ISecretaria;

  assuntos: IAssunto[];
  assunto: IAssunto;

  unidades : IUnidade[];
  unidade: IUnidade;

  endereco: IEndereco = { idEndereco: 0, logradouro: '', bairro: '', numero: '', cep: '', complemento: ''};

  hasUnidade: boolean = true;
  hasEndereco: boolean = false;

  location: Coordinates;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,
              public tipoProvider: TipoProvider,
              public secretariaProvider: SecretariaProvider,
              public enderecoProvider: EnderecoProvider,
              public servicesProvider: ServicesProvider,
              public formBuilder: FormBuilder,
              private geolocation: Geolocation,
              public toastCtrl: ToastController) {

    this.usuario = navParams.get('usuario');

    this.formOne = formBuilder.group({
      tipo: ['', Validators.compose([Validators.min(1), Validators.required])], //Validators.compose([Validators.min(1), Validators.required])
      secretaria: ['', Validators.compose([Validators.min(1), Validators.required])], //Validators.compose([Validators.min(1), Validators.required])
      assunto: ['', Validators.compose([Validators.min(1), Validators.required])], //Validators.compose([Validators.min(1), Validators.required])
    });

    this.formEnd = formBuilder.group({
      cep: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.required])], //Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.required])
      logradouro: ['', Validators.required], //Validators.required
      numero: ['', Validators.min(1)], //Validators.min(1)
      bairro: ['', Validators.required], //Validators.required
      complemento: ['', ],
    });

    this.getTipos();
    this.getSecretarias();
    this.hasUnidade = true;
    this.hasEndereco = false;

    console.log(this.usuario);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2500,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
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
      this.presentToast(err);
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

    this.tipo = tipo;
    this.manifestacao.idTipo=tipo.idTipo;
  }

  selectSecretaria(event,secretaria:ISecretaria){
    console.log(secretaria.idSecretaria);

    this.secretaria = secretaria;
    this.manifestacao.idSecretaria=secretaria.idSecretaria;
    this.assuntos = secretaria.tb_assunto;
    this.unidades = secretaria.tb_unidade;
  }

  selectAssunto(event,assunto:IAssunto){
    console.log(assunto.idAssunto);

    this.assunto = assunto;
    this.manifestacao.idAssunto=assunto.idAssunto;
  }

  selectUnidade(event,unidade:IUnidade){
    console.log(unidade.idUnidade);

    this.unidade = unidade;

    this.enderecoProvider.getEndereco(unidade.idUnidade).then(data => {
      console.log(data);
      this.manifestacao.tb_endereco.idEndereco = data["0"]["idEndereco"];
      this.endereco.bairro = data["0"]["bairro"];
      this.endereco.logradouro = data["0"]["logradouro"];
      this.endereco.numero = data["0"]["numero"];

      this.hasUnidade = true;
      console.log(this.manifestacao.tb_endereco.idEndereco)
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

  showDuvidas(duvida: string){
    let texto;

    if( duvida == "tipo" ){
      texto = "O tipo da manifestação define genericamente seu propósito: criticar, elogiar, denunciar etc.";
    } else if ( duvida == "secretaria" ) {
      texto = "A secretaria é o órgão da prefeitura sobre o qual você quer dizer algo.";
    } else if ( duvida == "assunto" ) {
      texto = "O assunto especifica qual será o foco da sua manifestação, de acordo com a secretaria escolhida."
    } else if ( duvida == "unidade" ){
      texto = "É a unidade de algum setor da prefeitura, como postos de saúde, escolas e a própria prefeitura."
    }

    this.criarAlert("Ajuda", texto, ['OK']);

  }

  exibirEndForm(){
    if(!this.hasEndereco){
      this.hasEndereco = true;
      this.hasUnidade = false;
      this.unidade = null;
      this.manifestacao.tb_endereco.idEndereco = 0;
    }
    else{
      this.hasEndereco = false;
    }
  }

  getLocation(){
    //Para simular o uso
    // this.endereco.numero = "121";
    // this.endereco.cep = "35180008";

    // this.getEnderecoPorCep();

    this.geolocation.getCurrentPosition()
      .then((resp) => {
        //manipular as coordenadas aqui
        this.location = resp.coords;
        this.servicesProvider.getLocation(this.location).subscribe(
          data => {
            console.log(data);

            if(data["status"] == "OK"){
              if(data["results"]["0"]["address_components"]["3"]["long_name"]){
                if(data["results"]["0"]["address_components"]["3"]["long_name"] == "Timóteo"){
                  //PEGANDO OS DADOS DO JSON DATA -- TRATAR ERROS DEPOIS // VERIFICAR SE A CIDADE É TIMÓTEO
                  this.endereco.logradouro = data["results"]["0"]["address_components"]["1"]["long_name"];
                  this.endereco.bairro = data["results"]["0"]["address_components"]["2"]["long_name"];
                  this.endereco.numero = data["results"]["0"]["address_components"]["0"]["long_name"];
                  if(data["results"]["0"]["address_components"]["6"]["long_name"])
                    this.endereco.cep = data["results"]["0"]["address_components"]["6"]["long_name"];

                  this.getCepCorreto(); //PARA NAO FICAR COM O CEP COM - (EX.: "35162-067")
                } else{
                  this.criarAlert('Localização inválida!', 'Você precisa estar em Timóteo parar utilizar esse recurso.', ['OK']);
                }
              } else{
                this.criarAlert('Localização inválida!', 'Você precisa estar em Timóteo parar utilizar esse recurso.', ['OK']);
              }
            } else{
              this.criarAlert('Erro inesperado', 'Erro ao recuperar sua localização. Tente novamente mais tarde', ['OK']);
            }
          }
        )
      }).catch((error) => {
        //exibir um alert com os erros
        this.criarAlert('Erro inesperado', 'Erro ao recuperar sua localização: '+error, ['OK']);
        console.log('Erro ao recuperar sua posição', error);
      });
  }

  getEnderecoPorCep(){
    this.servicesProvider.getEnderecoPorCep(this.endereco.cep).subscribe(
      data => {
        if(!data["erro"]){
          if(data["localidade"] == "Timóteo"){
            this.endereco.logradouro = data["logradouro"];
            this.endereco.bairro = data["bairro"];
          } else{
            this.endereco.cep = "";
            this.criarAlert('Endereço inválido!', 'Informe um endereço da cidade de Timóteo.', ['OK']);
          }
          console.log(data);
        } else{
          this.criarAlert('Endereço inválido!', 'Informe um endereço de CEP existente.', ['OK']);
        }
      }, error => {
        this.criarAlert('Endereço inválido!', 'Informe um endereço de CEP existente.', ['OK']);
    });
  }

  getCepCorreto(){
    this.endereco.cep.replace(/\D+/g, '');
  }

  voltarPaginaInicial() {
    this.navCtrl.setRoot(HomePage);
  }

  isEnabledBotaoProximo(){
    if(this.manifestacao.tb_endereco.idEndereco != 0){ //se foi informada alguma unidade
      if(this.formOne.valid)
        return false;
      else{
        return true;
      }
    } else{
      if(this.formOne.valid && this.formEnd.valid){
        return false;
      } else{
        return true;
      }
    }
  }

  save(){
    this.submitAttempt = true;

    console.log(this.usuario);

    //verificando se foi informada alguma unidade
    if(this.hasUnidade){
      //se sim, verifica apenas o primeiro formulario
      if(!this.formOne.valid){
        console.log("Erro nos dados!");
        console.log(this.formOne.value);
      } else{
        console.log("Dados certos!")
        console.log(this.formOne.value);

        //passar para a outra página
        this.navCtrl.push(AnexoPage, { usuario: this.usuario, manifestacao: this.manifestacao, tipo: this.tipo, assunto: this.assunto, secretaria: this.secretaria, unidade: this.unidade, endereco: this.endereco });
      }
    } else{ //senao, verifica os dois forms
      this.manifestacao.tb_endereco = this.endereco;

      if(!this.formOne.valid || !this.formEnd.valid){
        console.log("Erro nos dados!");
        console.log(this.formOne.value);
      }
      else {
        console.log("Dados certos!")
        console.log(this.formOne.value);

        //passar para a outra página
        this.navCtrl.push(AnexoPage, { usuario: this.usuario, manifestacao: this.manifestacao, tipo: this.tipo, assunto: this.assunto, secretaria: this.secretaria, unidade: this.unidade, endereco: this.endereco });
      }
    }

  }
}

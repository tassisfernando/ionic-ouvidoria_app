import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';
import { ManifestacaoProvider } from '../../providers/manifestacao/manifestacao';
import { ServicesProvider } from '../../providers/services/services';
import { TipoProvider } from '../../providers/tipo/tipo';
import { SecretariaProvider } from '../../providers/secretaria/secretaria';
import { EnderecoProvider } from '../../providers/endereco/endereco';

import {HttpClient} from '@angular/common/http';

import { ITipo } from '../../interfaces/ITipo';
import { ISecretaria } from '../../interfaces/ISecretaria';
import { IAssunto } from '../../interfaces/IAssunto';
import { IUnidade } from '../../interfaces/IUnidade';
import { IManifestacao } from '../../interfaces/IManifestacao';
import { IManifestante } from '../../interfaces/IManifestante';
import { IEndereco } from '../../interfaces/IEndereco';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-manifestacao',
  templateUrl: 'manifestacao.html',
})

export class ManifestacaoPage {

  manifestacao: IManifestacao = { dtEdicao: null, dtInclusao: null, idAssunto: 0, idTipo: 0, idSecretaria: 0, observacao: '', hash: '', emailAnonimo: '', tb_manifestante: null, tb_endereco: { idEndereco: 0, logradouro: '', bairro: '', numero: '', cep: '', complemento: '' } };
  manifestante: IManifestante = { nmManifestante: '', email: '', cpf_cnpj: '', rg: '', telefone: '' };
  endereco: IEndereco = { idEndereco: 0, logradouro: '', bairro: '', numero: '', cep: '', complemento: ''};
  secretarias: ISecretaria[];
  assuntos: IAssunto[];
  unidades : IUnidade[];
  tipos:ITipo[];
  selectedItem: number;
  toggle: boolean;
  email: boolean;
  hasEndereco: boolean;
  hasUnidade: boolean;
  location: Coordinates;
  base64Image: string;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public restProvider: RestProvider,
    public http: HttpClient,
    private geolocation: Geolocation,
    private manifestacaoProvider: ManifestacaoProvider,
    private servicesProvider: ServicesProvider,
    private tipoProvider: TipoProvider,
    private secretariaProvider: SecretariaProvider,
    private enderecoProvider: EnderecoProvider,
    private camera: Camera) {

      this.getTipos();
      this.getSecretarias();

      this.selectedItem = navParams.get('item');
      this.manifestacao.idTipo = this.selectedItem;

      this.toggle = false;
      this.email = false;
      this.hasEndereco = false;
  }

  ionViewDidLoad() {
    console.log(this.selectedItem);
  }

  voltarPaginaInicial() {
    this.navCtrl.setRoot(HomePage);
  }

  getTipos() {
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

  selectTipo(event,tipo:ITipo){
    console.log(tipo.idTipo);
    this.manifestacao.idTipo=tipo.idTipo;
  }

  getSecretarias() {
    this.secretariaProvider.getSecretarias()
      .then(data => {
        this.secretarias = data;
        console.log(this.secretarias);
      }).catch((err) => {
        this.criarAlert('Erro inesperado', 'Houve um erro inesperado de conexão. Tente novamente mais tarde.', ['OK'])
      });
  }

  selectSecretaria(event,secretaria:ISecretaria){
    console.log(secretaria.idSecretaria);
    this.manifestacao.idSecretaria=secretaria.idSecretaria;
    this.assuntos = secretaria.tb_assunto;
    this.unidades = secretaria.tb_unidade;
  }

  //Selecionando o tipo passado por parâmetro
  isSelected(tipo: ITipo){
    if(tipo.idTipo == this.selectedItem){
      return "true";
    } else{
      return "false";
    }
  }

  selectAssunto(event,assunto:IAssunto){
    console.log(assunto.idAssunto);
    this.manifestacao.idAssunto=assunto.idAssunto;
  }

  selectUnidade(event,unidade:IUnidade){
    console.log(unidade.idUnidade);
    this.enderecoProvider.getEndereco(unidade.idUnidade).then(data => {
      console.log(data);
      this.manifestacao.tb_endereco.idEndereco = data["0"]["idEndereco"];
      this.hasUnidade = true;
      console.log(this.manifestacao.tb_endereco.idEndereco)
    });
  }

  criarManifestacao(){
    //teste se há manifestante
      if((this.toggle) || (this.manifestante.nmManifestante != '')){
        this.manifestacao.tb_manifestante = this.manifestante;
      } else{
        this.manifestacao.tb_manifestante = null;
      }
      if((this.hasEndereco) || (this.endereco.logradouro != '')){
        this.manifestacao.tb_endereco = this.endereco;
      }

      console.log(this.manifestacao);
      this.manifestacaoProvider.criarManifestacao(this.manifestacao).then(data => {
        console.log("cadastrou", data);
        this.manifestacao = data;
        console.log(this.manifestacao.hash);
        this.showAlert();
      }).catch((err)=>{
        this.criarAlert('Erro', `A sua manifestação não foi cadastrada por um erro técnico. Tente novamente mais tarde.` , ['OK'])
      });

  }

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

  getLocation(){
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
        this.criarAlert('Erro inesperado', 'Erro ao recuperar sua localização', ['OK']);
        console.log('Erro ao recuperar sua posição', error);
      });
  }

  getCepCorreto(){
    this.endereco.cep.replace("-", "");
  }

  criarAlert(title: string, subTitle: string, buttons: string[]) {

      const alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: buttons
      });
      alert.present();
    }

  abreCamera(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
       }, (err) => {
        // Handle error
       });
    }
  }


  //Não estou usando
  /*presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Manifestação Enviada com Sucesso',
      duration: 3000
    });
    toast.present();

    this.voltarPaginaInicial();
  }*/

  //Não estou usando
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


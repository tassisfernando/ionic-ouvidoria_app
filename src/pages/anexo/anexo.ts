import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  manifestacao: IManifestacao = { dtEdicao: null, dtInclusao: null, idAssunto: 0, idTipo: 0, idSecretaria: 0, observacao: '', hash: '', emailAnonimo: '', tbmanifestante: null, tbendereco: { idEndereco: 0, logradouro: '', bairro: '', numero: '', cep: '', complemento: '' } };
  secretaria: ISecretaria;
  tipo: ITipo;
  unidade: IUnidade;
  assunto: IAssunto;
  endereco: IEndereco;

  base64Image: string;
  hasAnexo: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              private transfer: FileTransfer,
              private camera: Camera,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController ) {

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

    this.hasAnexo = false;
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

  isEnabledAnexo(){
    return this.hasAnexo;
  }

  abreCamera(type: string){
    const options: CameraOptions = {
      quality: 85,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA,
      sourceType: type == "foto" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      if(type == "foto"){
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
      } else {
        this.base64Image = imageData;
      }

      this.hasAnexo = true;
     }, (err) => {
      // Handle error
     });

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
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

/*tirarFoto(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  this.camera.getPicture(options).then((imageData) => {
    this.imageURI = imageData;
  }, (err) => {
    console.log(err);
    this.presentToast(err);
  });

}

uploadFile() {
  let loader = this.loadingCtrl.create({
    content: "Uploading..."
  });
  loader.present();
  const fileTransfer: FileTransferObject = this.transfer.create();

  let options: FileUploadOptions = {
    fileKey: 'ionicfile',
    fileName: 'ionicfile',
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers: {}
  }

  fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
    .then((data) => {
    console.log(data+" Uploaded Successfully");
    this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
    loader.dismiss();
    this.presentToast("Image uploaded successfully");
  }, (err) => {
    console.log(err);
    loader.dismiss();
    this.presentToast(err);
  });
} */

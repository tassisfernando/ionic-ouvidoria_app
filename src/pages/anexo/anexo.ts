import { IAnexo } from './../../interfaces/IAnexo';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IManifestacao } from './../../interfaces/IManifestacao';
import { IManifestante } from './../../interfaces/IManifestante';
import { IAssunto } from './../../interfaces/IAssunto';
import { IUnidade } from './../../interfaces/IUnidade';
import { ITipo } from './../../interfaces/ITipo';
import { ISecretaria } from './../../interfaces/ISecretaria';
import { IEndereco } from './../../interfaces/IEndereco';

import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';

import { FinalizarManifestacaoPage } from './../finalizar-manifestacao/finalizar-manifestacao';

@Component({
  selector: 'page-anexo',
  templateUrl: 'anexo.html',
})
export class AnexoPage {

  public submitAttempt: boolean = false;
  public form: FormGroup;

  usuario: IManifestante;
  manifestacao: IManifestacao = { dtEdicao: null, dtInclusao: null, idAssunto: 0, idTipo: 0, idSecretaria: 0, observacao: '', hash: '', emailAnonimo: '', tb_manifestante: null, tb_anexo: null, tb_endereco: { idEndereco: 0, logradouro: '', bairro: '', numero: '', cep: '', complemento: '' } };
  secretaria: ISecretaria;
  tipo: ITipo;
  unidade: IUnidade;
  assunto: IAssunto;
  endereco: IEndereco;
  anexo: IAnexo = { nmAnexo: '' };

  hasAnexo: boolean;
  anexoBase64: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              private fileChooser: FileChooser,
              private filePath: FilePath,
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

  //Cria um alert com um texto de ajuda ao usuário
  showDuvidas(duvida: string){
    let texto;

    if( duvida == "descricao" ){
      texto = "Na descrição você deve descrever de forma geral a manifestação e dar detalhes que não são contemplados nos outros campos.";
    } else if( duvida == "anexo" ){
      texto = "Se você quiser, adicione algum arquivo ou tire uma foto de algo que possa ajudar a detalhar sua manifestação. (APENAS UM ARQUIVO)"
    }

    this.criarAlert("Ajuda", texto, ['OK']);
  }

  //cria um toast recebendo a mensagem como parâmetro
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  //cria um alert recebendo os dados como parâmetros
  criarAlert(title: string, subTitle: string, buttons: string[]) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  //controla se o botão "Próximo" está habilitado
  isEnabledBotaoProximo(){
    return this.form.invalid;
  }

  //controla se o botões de adicionar anexo e o de abrir a câmera estão habilitados
  isEnabledAnexoButton(){
    return this.hasAnexo;
  }

  //seleciona um arquivo do celular escolhido pelo usuário
  selecionaAnexo(){
    this.fileChooser.open().then(file => {
      this.filePath.resolveNativePath(file).then(resolvedFilePath => {
        //pegando o arquivo aqui
        // this.anexo.nmAnexo = resolvedFilePath;
        this.anexo.nmAnexo = resolvedFilePath.substr(resolvedFilePath.lastIndexOf('/') + 1);
        this.hasAnexo = true;
        this.presentToast('Anexo adicionado com sucesso!')
      }).catch(err => {
        this.presentToast('Erro inesperado ao selecionar um arquivo!' + err)
      })
    }).catch(err => {
      this.presentToast('Erro inesperado ao selecionar um arquivo!' + err)
    })
  }

  //remove o anexo selecionado da escolha
  removerAnexo(){
    this.hasAnexo = false;
    this.anexo = { nmAnexo: '' };
  }

  //utilizando o plugin, abre a câmera do celular e recupera a foto tirada
  abreCamera(type: string){
    const options: CameraOptions = {
      quality: 85,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type == "foto" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
    };

    this.camera.getPicture(options).then((imageData) => {

      this.anexoBase64 = 'data:image/jpeg;base64,' + imageData;

      this.filePath.resolveNativePath(imageData).then( resolvedFilePath => {
        // this.anexo.nmAnexo = resolvedFilePath;
        this.anexo.nmAnexo = resolvedFilePath.substr(resolvedFilePath.lastIndexOf('/') + 1);
      })
      this.hasAnexo = true;

      this.presentToast('Foto adicionada com sucesso!')
     }, (err) => {
        this.presentToast('Erro inesperado ao utilizar a câmera!' + err)
     });
  }

  //função chamada ao clicar o botão "Próximo" e vai para a próxima página do cadastro
  proximo(){
    this.submitAttempt = true;

    console.log("Manifestação: ",this.manifestacao);
    console.log("Usuário: ", this.usuario);

    if(this.form.valid){
      if(this.hasAnexo){
        this.manifestacao.tb_anexo = this.anexo;
      } else{
        this.manifestacao.tb_anexo = null;
      }

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


/*//método para o provider?
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

  //Usar isso no provider, chamando o servidor de arquivos?
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

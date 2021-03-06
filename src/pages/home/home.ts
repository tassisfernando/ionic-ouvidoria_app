import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController, Platform } from 'ionic-angular';

import { UsuarioPage } from './../usuario/usuario';
import { LocalInfoPage } from './../local-info/local-info';
import { TabsPage } from './../tabs/tabs';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Network } from  '@ionic-native/network';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tipo:any;
  hasConnection: boolean;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private network: Network,
    private platform: Platform,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private push: Push,
    private localNotifications: LocalNotifications) {

      /*this.platform.ready().then((ready) => {
        this.localNotifications.on('click', (notification, state) => {
          let json = JSON.parse(notification.data);

          let alert = this.criarAlert(notification.title, json.mydata, ['OK']);
        });
      });*/

      // this.platform.ready().then((ready) => {
      //   this.localNotifications.on('click').subscribe((notification) => {
      //     let json = JSON.parse(notification.data);

      //     this.criarAlert(notification.title, json.mydata, ['OK']);
      //   });
      // });

      this.hasConnection = true;

      // this.push.hasPermission().then((res: any) => {
      //   if (res.isEnabled) {
      //     this.criarAlert('Sucesso', 'Permissão concedida para mandar push notifications', ['OK']);

      //     const options: PushOptions = {
      //       android: {},
      //       ios: {},
      //       windows: {},
      //       browser: {
      //         pushServiceURL: ''
      //       }
      //     };

      //     const pushObject: PushObject = this.push.init(options);

      //     pushObject.on('notification').subscribe((notification: any) => {
      //       this.criarAlert(notification.title, notification.message, ['OK']);
      //     });

      //     pushObject.on('registration').subscribe((registration: any) => console.log('Serviço registrado', registration));

      //     pushObject.on('error').subscribe(error => console.error('Erro com o plugin Push', error));

      //   } else {
      //     this.criarAlert('Falha', 'Permissão negada para enviar push notifications', ['OK']);
      //   }
      // });
  }

  testeLocalNotifications(){
    this.localNotifications.schedule({
      id: 1,
      title: 'Teste',
      text: 'Testando Local Notifications',
      data: { mydata: "Minha mensagem escondida é essa: busquem conhecimento." },
      icon: '../../assets/imgs/brasao.png',
    });
  }

  //método executado quando a página vai ser construída
  ionViewDidEnter(){
    this.checkConnection();
  }

  //executa quando a página é recarregada
  reloadPage(){
    this.checkConnection();
  }

  //verifica a conexão com a internet
  checkConnection(){
    this.network.onDisconnect().subscribe(() => {
      if(this.hasConnection){
        this.presentToast('Não há conexão com a internet.')
      }
      this.hasConnection = false;
    });

    this.network.onConnect().subscribe(() => {
      console.log('conectado!');
      if(!this.hasConnection){
        this.presentToast('Conectado!');
      }
      this.hasConnection = true;
    });
  }

  //abre a página 1 do cadastro de manifestação não anônima
  abrirUsuarioPage(){
    // this.testeLocalNotifications();
    this.navCtrl.push(UsuarioPage);
  }

  //abre a página 1 do cadastro de manifestação anônima
  abrirLocalInfoPage(){
    this.navCtrl.push(LocalInfoPage, {usuario: null});
  }

  //abre a página que exibe as manifestações do usuário
  abrirManifestacaoPage(){
    this.navCtrl.push(TabsPage);
    let loader = this.loadingCtrl.create({
      content: "Carregando...",
      duration: 2000,
      spinner: 'crescent'
    });
    loader.present();
  }

  //cria um toast recebendo a mensagem como parâmetros
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

  //cria um alert recebendo os dados como parâmetros
  criarAlert(title: string, subTitle: string, buttons: string[]) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }
}

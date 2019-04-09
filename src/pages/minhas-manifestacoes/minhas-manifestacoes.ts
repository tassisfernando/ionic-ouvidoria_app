import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';


/**
 * Generated class for the MinhasManifestacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-minhas-manifestacoes',
  templateUrl: 'minhas-manifestacoes.html',
})
export class MinhasManifestacoesPage {

  manifestacoes: any;
  assunto:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public restProvider: RestProvider) {
    this.getManifestacoes();
  }


  getManifestacoes() {
    this.restProvider.getMinhasManifestações()
      .then(data => {
        this.manifestacoes = data;
        console.log(this.manifestacoes);
        console.log(this.manifestacoes.idAssunto);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhasManifestacoesPage');
   
 
  }
  teste(){
    switch(this.manifestacoes.idAssunto){
      case 1: 
         this.assunto = "A";
        break;
        case 2: 
         this.assunto = "B";
        break;
        case 3: 
         this.assunto = "C";
        break;
        case 4: 
        this.assunto = "C";
       break;
    }
  }

  

}

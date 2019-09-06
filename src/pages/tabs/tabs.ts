import { IManifestacao } from './../../interfaces/IManifestacao';
import { StorageProvider } from './../../providers/storage/storage';
import { ManifestacaoProvider } from './../../providers/manifestacao/manifestacao';
import { ManifestacoesFechadasPage } from './../manifestacoes-fechadas/manifestacoes-fechadas';
import { ManifestacoesAndamentoPage } from './../manifestacoes-andamento/manifestacoes-andamento';
import { ManifestacoesAbertasPage } from './../manifestacoes-abertas/manifestacoes-abertas';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabRecebidas = ManifestacoesAbertasPage;
  tabEmAnalise = ManifestacoesAndamentoPage;
  tabEncerrada = ManifestacoesFechadasPage;

  manifestacoesBd: IManifestacao[];
  manifestacoesStorage: IManifestacao[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}

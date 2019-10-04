import { IManifestacao } from './../../interfaces/IManifestacao';
import { ManifestacoesFechadasPage } from './../manifestacoes-fechadas/manifestacoes-fechadas';
import { ManifestacoesAndamentoPage } from './../manifestacoes-andamento/manifestacoes-andamento';
import { ManifestacoesAbertasPage } from './../manifestacoes-abertas/manifestacoes-abertas';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

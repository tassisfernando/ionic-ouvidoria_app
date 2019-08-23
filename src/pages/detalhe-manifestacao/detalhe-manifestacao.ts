import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IManifestacao } from './../../interfaces/IManifestacao';
import { IEndereco } from './../../interfaces/IEndereco';
import { IAssunto } from './../../interfaces/IAssunto';
import { ITipo } from './../../interfaces/ITipo';
import { ISecretaria } from './../../interfaces/ISecretaria';
import { IManifestante } from './../../interfaces/IManifestante';
import { IUnidade } from './../../interfaces/IUnidade';

import { EnderecoProvider } from '../../providers/endereco/endereco';

@IonicPage()
@Component({
  selector: 'page-detalhe-manifestacao',
  templateUrl: 'detalhe-manifestacao.html',
})
export class DetalheManifestacaoPage {

  manifestacao: IManifestacao;
  usuario: IManifestante;
  secretaria: ISecretaria;
  tipo: ITipo;
  assunto: IAssunto;
  endereco: IEndereco;
  unidade: IUnidade;

  constructor(public navCtrl: NavController, public navParams: NavParams, public enderecoProvider: EnderecoProvider) {
    this.manifestacao = navParams.get('manifestacao');
    this.usuario = this.manifestacao.tbmanifestante;
    this.tipo = this.manifestacao.tbtipo;
    this.endereco = this.manifestacao.tbendereco;
    this.assunto = this.manifestacao.tbassunto;
    this.secretaria = this.manifestacao.tbsecretaria;

    if(this.endereco.idUnidade){
      enderecoProvider.getUnidade(this.endereco.idUnidade).then( (unidade) => {
        if(unidade){
          this.unidade = unidade;
        }
      })
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalheManifestacaoPage');
  }

}

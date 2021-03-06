import { IManifestante } from './../../interfaces/IManifestante';
import { LocalInfoPage } from './../local-info/local-info';
import { MinhasManifestacoesPage } from './../minhas-manifestacoes/minhas-manifestacoes';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CpfValidator } from  '../../assets/validators/cpf';



@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  public form: FormGroup;
  private submitAttempt: boolean = false;

  public usuario: IManifestante = { nmManifestante: '', email: '', cpf_cnpj: '', rg: '', telefone: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      nome: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      cpf: ['', Validators.compose([CpfValidator.isValidCpf, Validators.required])],
      rg: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.required])],
      email: ['', Validators.compose([Validators.minLength(5), Validators.email, Validators.required])],
      telefone: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(15), Validators.required])]
    });
  }

  //função chamada ao clicar o botão "Próximo" e vai para a próxima página do cadastro
  proximo(){
    this.submitAttempt = true;

    console.log(this.usuario);

    if(!this.form.valid){
        console.log("Erro nos dados!");
        console.log(this.form.value);
    }
    else {
        console.log("Dados certos!")
        console.log(this.form.value);
        //passar para a outra página
        this.navCtrl.push(LocalInfoPage, {usuario: this.usuario});
      }
  }
}

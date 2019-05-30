import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgeValidator } from  '../../assets/validators/age';
import { UsernameValidator } from  '../../assets/validators/username';
import { CpfValidator } from  '../../assets/validators/cpf';

/**
 * Generated class for the ReactiveFormsValidationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reactive-forms-validation',
  templateUrl: 'reactive-forms-validation.html',
})
export class ReactiveFormsValidationPage {

  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;

  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.slideOneForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      age: ['', AgeValidator.isValid],
      cpf: ['', CpfValidator.isValidCpf]
    });

    this.slideTwoForm = formBuilder.group({
        username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
        privacy: ['', Validators.required],
        bio: ['']
    });

  }

  ionViewDidLoad() {  }

  save(){

    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
        console.log("It's not good!");
        console.log(this.slideOneForm.value);
    } 
    else if(!this.slideTwoForm.valid){
        console.log("It's not good!");
        console.log(this.slideTwoForm.value);
    }
    else {
        console.log("success!")
        console.log(this.slideOneForm.value);
        console.log(this.slideTwoForm.value);
    }
  }

}

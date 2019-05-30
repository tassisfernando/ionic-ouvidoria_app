import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsValidationPage } from './reactive-forms-validation';

@NgModule({
  declarations: [
    ReactiveFormsValidationPage,
  ],
  imports: [
    IonicPageModule.forChild(ReactiveFormsValidationPage),
    CommonModule,
    ReactiveFormsModule,
    IonicPageModule,
  ],
})
export class ReactiveFormsValidationPageModule {}



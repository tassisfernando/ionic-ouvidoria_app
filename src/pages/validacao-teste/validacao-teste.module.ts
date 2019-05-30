import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidacaoTestePage } from './validacao-teste';

@NgModule({
  declarations: [
    ValidacaoTestePage,
  ],
  imports: [
    IonicPageModule.forChild(ValidacaoTestePage),
  ],
})
export class ValidacaoTestePageModule {}

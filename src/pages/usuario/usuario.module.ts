import { BrMaskerModule } from 'brmasker-ionic-3'; //tirar se der merda
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioPage } from './usuario';

@NgModule({
  declarations: [
    UsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioPage),
    BrMaskerModule
  ],
  exports: [
    BrMaskerModule,
  ]
})
export class UsuarioPageModule {}

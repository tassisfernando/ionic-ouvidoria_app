import { BrMaskerModule } from 'brmasker-ionic-3'; //tirar se der merda
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalInfoPage } from './local-info';

@NgModule({
  declarations: [
    LocalInfoPage,
  ],
  imports: [
    BrMaskerModule, //tirar se der merda
    IonicPageModule.forChild(LocalInfoPage),
  ],
  exports: [
    BrMaskerModule,
  ]
})
export class LocalInfoPageModule {}

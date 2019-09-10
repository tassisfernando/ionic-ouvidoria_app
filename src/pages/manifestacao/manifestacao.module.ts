import { BrMaskerModule } from 'brmasker-ionic-3';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManifestacaoPage } from './manifestacao';

@NgModule({
  declarations: [
    ManifestacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ManifestacaoPage),
    BrMaskerModule
  ],
  exports: [
    BrMaskerModule,
  ]
})
export class ManifestacaoPageModule {}


import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManifestacaoPage } from './manifestacao';

@NgModule({
  declarations: [
    ManifestacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ManifestacaoPage),
  ],
})
export class ManifestacaoPageModule {}


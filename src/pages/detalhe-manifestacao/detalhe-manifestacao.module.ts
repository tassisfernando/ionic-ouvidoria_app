import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheManifestacaoPage } from './detalhe-manifestacao';

@NgModule({
  declarations: [
    DetalheManifestacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheManifestacaoPage),
  ],
})
export class DetalheManifestacaoPageModule {}

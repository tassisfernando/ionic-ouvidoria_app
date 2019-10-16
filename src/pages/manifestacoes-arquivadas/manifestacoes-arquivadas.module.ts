import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManifestacoesArquivadasPage } from './manifestacoes-arquivadas';

@NgModule({
  declarations: [
    ManifestacoesArquivadasPage,
  ],
  imports: [
    IonicPageModule.forChild(ManifestacoesArquivadasPage),
  ],
})
export class ManifestacoesArquivadasPageModule {}

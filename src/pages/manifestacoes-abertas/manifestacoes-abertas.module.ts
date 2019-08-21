import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManifestacoesAbertasPage } from './manifestacoes-abertas';

@NgModule({
  declarations: [
    ManifestacoesAbertasPage,
  ],
  imports: [
    IonicPageModule.forChild(ManifestacoesAbertasPage),
  ],
})
export class ManifestacoesAbertasPageModule {}

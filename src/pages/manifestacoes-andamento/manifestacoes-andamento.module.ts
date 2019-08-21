import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManifestacoesAndamentoPage } from './manifestacoes-andamento';

@NgModule({
  declarations: [
    ManifestacoesAndamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(ManifestacoesAndamentoPage),
  ],
})
export class ManifestacoesAndamentoPageModule {}

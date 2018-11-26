import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinhasManifestacoesPage } from './minhas-manifestacoes';

@NgModule({
  declarations: [
    MinhasManifestacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(MinhasManifestacoesPage),
  ],
})
export class MinhasManifestacoesPageModule {}

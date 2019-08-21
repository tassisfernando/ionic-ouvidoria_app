import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManifestacoesFechadasPage } from './manifestacoes-fechadas';

@NgModule({
  declarations: [
    ManifestacoesFechadasPage,
  ],
  imports: [
    IonicPageModule.forChild(ManifestacoesFechadasPage),
  ],
})
export class ManifestacoesFechadasPageModule {}

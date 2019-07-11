import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalInfoPage } from './local-info';

@NgModule({
  declarations: [
    LocalInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalInfoPage),
  ],
})
export class LocalInfoPageModule {}

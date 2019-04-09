import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ManifestacaoPage} from '../pages/manifestacao/manifestacao';
import {CadastroPage} from '../pages/cadastro/cadastro'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MinhasManifestacoesPage } from '../pages/minhas-manifestacoes/minhas-manifestacoes';



import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { BrMaskerModule} from 'brmasker-ionic-3';
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ManifestacaoPage,
    MinhasManifestacoesPage,
    CadastroPage
  ],
  imports: [
    BrowserModule,
    BrMaskerModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ManifestacaoPage,
    MinhasManifestacoesPage,
    CadastroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}

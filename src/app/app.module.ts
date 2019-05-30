import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ManifestacaoPage} from '../pages/manifestacao/manifestacao';
import {CadastroPage} from '../pages/cadastro/cadastro';
import { MinhasManifestacoesPage } from '../pages/minhas-manifestacoes/minhas-manifestacoes';
import { ValidacaoTestePage } from '../pages/validacao-teste/validacao-teste'; //tirar depois
import { ReactiveFormsValidationPage } from '../pages/reactive-forms-validation/reactive-forms-validation'; //tirar depois

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { BrMaskerModule} from 'brmasker-ionic-3';

import { RestProvider } from '../providers/rest/rest';
import { ManifestacaoProvider } from '../providers/manifestacao/manifestacao';
import { ServicesProvider } from '../providers/services/services';
import { TipoProvider } from '../providers/tipo/tipo';
import { SecretariaProvider } from '../providers/secretaria/secretaria';
import { EnderecoProvider } from '../providers/endereco/endereco';

import { Geolocation } from '@ionic-native/geolocation/';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ManifestacaoPage,
    MinhasManifestacoesPage,
    CadastroPage,
    ValidacaoTestePage, //tirar depoiss
    ReactiveFormsValidationPage //tirar depois
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
    CadastroPage,
    ValidacaoTestePage, //tirar depoiss
    ReactiveFormsValidationPage //tirar depois
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Geolocation,
    ManifestacaoProvider,
    ServicesProvider,
    TipoProvider,
    SecretariaProvider,
    EnderecoProvider
  ]
})
export class AppModule {}

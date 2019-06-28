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
import { Network } from  '@ionic-native/network'; //TIRAR O NGX SE DER MERDA
import { Geolocation } from '@ionic-native/geolocation/';
import { Camera } from '@ionic-native/camera';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { BrMaskerModule} from 'brmasker-ionic-3';

import { RestProvider } from '../providers/rest/rest';
import { ManifestacaoProvider } from '../providers/manifestacao/manifestacao';
import { ServicesProvider } from '../providers/services/services';
import { TipoProvider } from '../providers/tipo/tipo';
import { SecretariaProvider } from '../providers/secretaria/secretaria';
import { EnderecoProvider } from '../providers/endereco/endereco';


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
    RestProvider,
    Geolocation,
    ManifestacaoProvider,
    ServicesProvider,
    TipoProvider,
    SecretariaProvider,
    EnderecoProvider,
    Network,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}

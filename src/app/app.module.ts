import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsuarioPage } from '../pages/usuario/usuario';
import { LocalInfoPage } from './../pages/local-info/local-info';
import { AnexoPage } from './../pages/anexo/anexo';
import { FinalizarManifestacaoPage } from './../pages/finalizar-manifestacao/finalizar-manifestacao';
import { TabsPage } from './../pages/tabs/tabs';
import { ManifestacoesAndamentoPage } from './../pages/manifestacoes-andamento/manifestacoes-andamento';
import { ManifestacoesFechadasPage } from './../pages/manifestacoes-fechadas/manifestacoes-fechadas';
import { ManifestacoesAbertasPage } from './../pages/manifestacoes-abertas/manifestacoes-abertas';

import { MinhasManifestacoesPage } from '../pages/minhas-manifestacoes/minhas-manifestacoes'; //tirar depois
import {ManifestacaoPage} from '../pages/manifestacao/manifestacao'; //Tirar depois
import {CadastroPage} from '../pages/cadastro/cadastro'; //tirar depois
import { ValidacaoTestePage } from '../pages/validacao-teste/validacao-teste'; //tirar depois
import { ReactiveFormsValidationPage } from '../pages/reactive-forms-validation/reactive-forms-validation'; //tirar depois

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from  '@ionic-native/network'; //TIRAR O NGX SE DER MERDA
import { Geolocation } from '@ionic-native/geolocation/';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { BrMaskerModule} from 'brmasker-ionic-3';

import { RestProvider } from '../providers/rest/rest';
import { ManifestacaoProvider } from '../providers/manifestacao/manifestacao';
import { ServicesProvider } from '../providers/services/services';
import { TipoProvider } from '../providers/tipo/tipo';
import { SecretariaProvider } from '../providers/secretaria/secretaria';
import { EnderecoProvider } from '../providers/endereco/endereco';
import { StorageProvider } from '../providers/storage/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ManifestacoesAbertasPage,
    ManifestacoesFechadasPage,
    ManifestacoesAndamentoPage,
    UsuarioPage,
    LocalInfoPage,
    AnexoPage,
    FinalizarManifestacaoPage,
    TabsPage,
    MinhasManifestacoesPage, //tirar depois
    ManifestacaoPage, //tirar depois
    ValidacaoTestePage, //tirar depois
    ReactiveFormsValidationPage, //tirar depois
    CadastroPage, //Tirar depois
  ],
  imports: [
    BrowserModule,
    BrMaskerModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UsuarioPage,
    LocalInfoPage,
    AnexoPage,
    FinalizarManifestacaoPage,
    TabsPage,
    ManifestacoesAbertasPage,
    ManifestacoesFechadasPage,
    ManifestacoesAndamentoPage,
    MinhasManifestacoesPage, //tirar depois
    ManifestacaoPage, //tirar depois
    CadastroPage, //tirar depois
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
    StorageProvider,
  ]
})
export class AppModule {}

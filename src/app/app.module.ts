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
import { DetalheManifestacaoPage } from './../pages/detalhe-manifestacao/detalhe-manifestacao';
import { ComentariosPage } from './../pages/comentarios/comentarios';
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
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx'; //TIRAR O NGX SE DER MERDA
import { File } from '@ionic-native/file/ngx'; //TIRAR O NGX SE DER MERDA
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { FileOpener } from "@ionic-native/file-opener";

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
import { ComentarioProvider } from '../providers/comentario/comentario';

//simulando camera no browser
class CameraMock extends Camera{
  getPicture(options){
    return new Promise((resolve, reject) => {
      resolve("data:image/png;base64,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");
    })
  }
}

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
    DetalheManifestacaoPage,
    ComentariosPage,
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
    DetalheManifestacaoPage,
    ComentariosPage,
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
    Camera, //Depois que testar nativo usar só { provide: Camera, useClass: CameraMock },
    FileChooser,
    FileOpener,
    FilePath,
    FileTransfer,
    FileTransferObject,
    // FileUploadOptions, descomentar se der merda
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    ComentarioProvider,
  ]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { UsuarioPage } from '../pages/usuario/usuario';
// import { UsuarioPageModule } from './../pages/usuario/usuario.module';

import { LocalInfoPage } from './../pages/local-info/local-info'; //DESCOMENTAR SE DER MERDA
// import { LocalInfoPageModule } from './../pages/local-info/local-info.module';

import { AnexoPage } from './../pages/anexo/anexo'; //DESCOMENTAR SE DER MERDAA
// import { AnexoPageModule } from './../pages/anexo/anexo.module';

import { ComentariosPage } from './../pages/comentarios/comentarios';  //DESCOMENTAR SE DER MERDAA
// import { ComentariosPageModule } from './../pages/comentarios/comentarios.module';

import { DetalheManifestacaoPage } from './../pages/detalhe-manifestacao/detalhe-manifestacao';
// import { DetalheManifestacaoPageModule } from './../pages/detalhe-manifestacao/detalhe-manifestacao.module';

import { FinalizarManifestacaoPage } from './../pages/finalizar-manifestacao/finalizar-manifestacao';  //DESCOMENTAR SE DER MERDA
// import { FinalizarManifestacaoPageModule } from './../pages/finalizar-manifestacao/finalizar-manifestacao.module';

import { TabsPage } from './../pages/tabs/tabs';
// import { TabsPageModule } from './../pages/tabs/tabs.module';

import { ManifestacoesAndamentoPage } from './../pages/manifestacoes-andamento/manifestacoes-andamento';
// import { ManifestacoesAndamentoPageModule } from './../pages/manifestacoes-andamento/manifestacoes-andamento.module';

import { ManifestacoesFechadasPage } from './../pages/manifestacoes-fechadas/manifestacoes-fechadas';
// import { ManifestacoesFechadasPageModule } from './../pages/manifestacoes-fechadas/manifestacoes-fechadas.module';

import { ManifestacoesAbertasPage } from './../pages/manifestacoes-abertas/manifestacoes-abertas';
// import { ManifestacoesAbertasPageModule } from './../pages/manifestacoes-abertas/manifestacoes-abertas.module';

import { ManifestacoesArquivadasPage } from './../pages/manifestacoes-arquivadas/manifestacoes-arquivadas';

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

import { BrMaskerModule } from 'brmasker-ionic-3';

import { RestProvider } from '../providers/rest/rest';
import { ManifestacaoProvider } from '../providers/manifestacao/manifestacao';
import { ServicesProvider } from '../providers/services/services';
import { TipoProvider } from '../providers/tipo/tipo';
import { SecretariaProvider } from '../providers/secretaria/secretaria';
import { EnderecoProvider } from '../providers/endereco/endereco';
import { StorageProvider } from '../providers/storage/storage';
import { ComentarioProvider } from '../providers/comentario/comentario';

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
    ManifestacoesArquivadasPage,
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
    ManifestacoesArquivadasPage,
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

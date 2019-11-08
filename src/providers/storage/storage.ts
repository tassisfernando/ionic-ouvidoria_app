import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { IManifestacao } from '../../interfaces/IManifestacao';

@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient, private storage: Storage) {
  }

  //Registra no storage o vetor de manifestações de acordo com a chave passada, pois pode ser arquivada ou baixada normalmente
  setStorage(chave, manifestacoes: IManifestacao[]){
    this.storage.set(chave, manifestacoes);
  }

  //retorna o que está salvo no storage de acordo com a chave passada
  getStorage(chave){
    return this.storage.get(chave);
  }


}

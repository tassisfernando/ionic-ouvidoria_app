import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { IManifestacao } from '../../interfaces/IManifestacao';

@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }

  setStorage(chave, manifestacoes: IManifestacao[]){
    this.storage.set(chave, manifestacoes);
  }

  getStorage(chave){
    return this.storage.get(chave);
  }


}

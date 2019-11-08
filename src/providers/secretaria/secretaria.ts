import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISecretaria } from '../../interfaces/ISecretaria';

/*
  Generated class for the SecretariaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SecretariaProvider {

  apiUrl = 'https://ouvidoria.alessiojr.com/api';

  constructor(public http: HttpClient) {  }

  //Método GET que retorna todas as secretarias do BD
  getSecretarias() {
    return new Promise<ISecretaria[]>(resolve => {
      this.http.get<ISecretaria[]>(this.apiUrl + '/secretarias').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

}

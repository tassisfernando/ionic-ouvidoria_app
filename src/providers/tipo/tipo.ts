import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITipo } from '../../interfaces/ITipo';

/*
  Generated class for the TipoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TipoProvider {

  // apiUrl = 'https://ouvidoria.alessiojr.com/api';
  apiUrl = 'http://127.0.0.1:8000';

  constructor(public http: HttpClient) {
  }

  //Método GET que retorna todos os Tipos do BD
  getTipos() {
    return new Promise<ITipo[]>(resolve => {
      this.http.get<ITipo[]>(this.apiUrl + '/tipos').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

}

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

  apiUrl = 'http://localhost:8000/api';

  constructor(public http: HttpClient) {
    console.log('Hello TipoProvider Provider');
  }

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

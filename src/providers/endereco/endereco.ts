import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEndereco } from '../../interfaces/IEndereco';

/*
  Generated class for the EnderecoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnderecoProvider {

  apiUrl = 'http://localhost:8000/api';

  constructor(public http: HttpClient) { }

  getEndereco(idUnidade: number){
    return new Promise<IEndereco>(resolve => {
      this.http.get<IEndereco>(this.apiUrl + '/unidades/endereco/'+idUnidade).subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IAssunto } from '../../interfaces/IAssunto';
import { IUnidade } from '../../interfaces/IUnidade';
import { IManifestante } from '../../interfaces/IManifestante';

//NÃO ESTOU USANDO ESSE PROVIDER
@Injectable()
export class RestProvider {

  apiUrl = 'http://localhost:8000/api';
  apiCep = 'https://viacep.com.br/ws/';
  apiGeoCode = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  key = '&key=AIzaSyDHw5MqJSOxnLvLYmnluEYqS6WSAvtGXOw';

  constructor(public http: HttpClient) {
  }

  //Não estou usando
  getAssuntos() {
    return new Promise<IAssunto[]>(resolve => {
      this.http.get<IAssunto[]>(this.apiUrl + '/assuntos').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  //Não estou usando
  getUnidades() {
    return new Promise<IUnidade[]>(resolve => {
      this.http.get<IUnidade[]>(this.apiUrl + '/unidades').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  //Não estou usando
  criarManifestante(manifestante: IManifestante) {
    return new Promise<IManifestante>((resolve, reject) => {
      var data = {
        nmManifestante: manifestante.nmManifestante,
        email: manifestante.email,
        cpf_cnpj: manifestante.cpf_cnpj,
        rg: manifestante.rg,
      };
      this.http.post<IManifestante>(this.apiUrl + '/criarmanifestante', data).
        subscribe((result: any) => {
          resolve(result.json);
          console.log(result)
        },
          (error) => {
            reject(error.json);
            console.log(error);
          })
    });
  }

  //Não estou usando
  getUltimoManifestante(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/manifestante/ultima').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }
}

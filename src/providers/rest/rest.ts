import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ITipo } from '../../interfaces/ITipo';

@Injectable()
export class RestProvider {

  apiUrl = 'http://localhost:3000';

  constructor(public http: HttpClient) {
  }

  getTipos() {
    return new Promise<ITipo[]>(resolve => {
      this.http.get<ITipo[]>(this.apiUrl + '/tipos').subscribe(data => {
        resolve(data);
        console.log(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  getSecretarias() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/secretarias').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  getAssuntos() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/assuntos').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }


  getManifestacoes() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/manifestacoes').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }
  getUnidades() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/unidades').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  //CRIAR UM GET MANIFESTAÇÃO PELO PROTOCOLO
  getMinhasManifestações() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/manifestacoes').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  criarManifestacao( idtipo:any, cdsecretaria:any, cdassunto:any,cdunidade:any) {
    return new Promise((resolve, reject) => {
      var data = {
        idtipo:idtipo,
        cdsecretaria:cdsecretaria,
        cdassunto:cdassunto,
        cdunidade:cdunidade
      };
      this.http.post(this.apiUrl + '/criarmanifestacoes', data).
        subscribe((result: any) => {
          resolve(result.json);
        },
          (error) => {
            reject(error.json);
            console.log(error);
          })
    });
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ITipo } from '../../interfaces/ITipo';
import { ISecretaria } from '../../interfaces/ISecretaria';
import { IAssunto } from '../../interfaces/IAssunto';
import { IUnidade } from '../../interfaces/IUnidade';
import { IManifestacao } from '../../interfaces/IManifestacao';

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
    return new Promise<ISecretaria[]>(resolve => {
      this.http.get<ISecretaria[]>(this.apiUrl + '/secretarias').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

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

  getMinhasManifestações() {
    return new Promise<IManifestacao[]>(resolve => {
      this.http.get<IManifestacao[]>(this.apiUrl + '/manifestacoes').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  getManifestacaoPorProtocolo(protocolo: number){
    return new Promise<IManifestacao>(resolve => {
      this.http.get<IManifestacao>(this.apiUrl + '/manifestacoes/'+protocolo)
    });
  }

  getUltimaManifestacao(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/manifestacoes/ultima').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  /*criarManifestacao(manifestacao: IManifestacao) {
      let data = {
        cdtipo: manifestacao.idtipo,
        cdsecretaria: manifestacao.idsecretaria,
        cdassunto: manifestacao.idassunto,
        cdunidade: manifestacao.idunidade,
        observacao: manifestacao.observacao,
      };
      return this.http.post<IManifestacao>(this.apiUrl + '/criarmanifestacoes', data);
  }*/


  criarManifestacao(manifestacao: IManifestacao) {
    return new Promise<IManifestacao>((resolve, reject) => {
      var data = {
        cdtipo: manifestacao.idtipo,
        cdsecretaria: manifestacao.idsecretaria,
        cdassunto: manifestacao.idassunto,
        cdunidade: manifestacao.idunidade,
        observacao: manifestacao.observacao,
      };
      this.http.post<IManifestacao>(this.apiUrl + '/criarmanifestacoes', data).
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

}

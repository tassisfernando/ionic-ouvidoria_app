import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IManifestacao } from '../../interfaces/IManifestacao';

/*
  Generated class for the ManifestacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ManifestacaoProvider {

  apiUrl = 'http://localhost:8000/api';

  constructor(public http: HttpClient) {
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

  getManifestacaoPorStatus(status: string) {
    return new Promise<IManifestacao[]>(resolve => {
      this.http.get<IManifestacao[]>(this.apiUrl + '/manifestacoes/'+status).subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  criarManifestacao(manifestacao: IManifestacao) {
    return new Promise<IManifestacao>((resolve, reject) => {
      var data = manifestacao;
      this.http.post<IManifestacao>(this.apiUrl + '/manifestacoes', data).
        subscribe((result: IManifestacao) => { //MUDEI AQUI "TIREI O ANY  "
          resolve(result); //MUDEI AQUI "TIREI O .JSON"
          console.log(result)
        },
          (error) => {
            reject(error.json);
            console.log(error);
          })
    });
  }


  //Não estou usando
  getManifestacaoPorProtocolo(protocolo: number){
    return new Promise<IManifestacao>(resolve => {
      this.http.get<IManifestacao>(this.apiUrl + '/manifestacoes/'+protocolo)
    });
  }

  //Não estou usando
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

  //Não estou usando
  criarManifestacaoManifestante(manifestacao: IManifestacao, idManifestante: number) {
    return new Promise<IManifestacao>((resolve, reject) => {
      var data = {
        idtipo: manifestacao.idTipo,
        idsecretaria: manifestacao.idSecretaria,
        idassunto: manifestacao.idAssunto,
        idendereco: manifestacao.tbendereco.idEndereco,
        descricao: manifestacao.observacao,
        idManifestante: idManifestante
      };
      this.http.post<IManifestacao>(this.apiUrl + '/manifestacaos/', data).
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

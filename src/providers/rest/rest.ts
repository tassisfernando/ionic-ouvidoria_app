import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ITipo } from '../../interfaces/ITipo';
import { ISecretaria } from '../../interfaces/ISecretaria';
import { IAssunto } from '../../interfaces/IAssunto';
import { IUnidade } from '../../interfaces/IUnidade';
import { IManifestacao } from '../../interfaces/IManifestacao';
import { IManifestante } from '../../interfaces/IManifestante';
import { IEndereco } from '../../interfaces/IEndereco';


@Injectable()
export class RestProvider {

  apiUrl = 'http://localhost:8000/api';
  apiCep = 'https://viacep.com.br/ws/';
  apiGeoCode = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  key = '&key=AIzaSyAcm3zQqelJL9GQ8OmjOnXqtvThsP1roDk';

  constructor(public http: HttpClient) {
  }

  getEnderecoPorCep(cep: string):any{
    return this.http.get(this.apiCep +cep+'/json/');
  }

  getLocation(location: Coordinates){
    return this.http.get(this.apiGeoCode+location.latitude+","+location.longitude+this.key);
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
  criarManifestacaoManifestante(manifestacao: IManifestacao, idManifestante: number) {
    return new Promise<IManifestacao>((resolve, reject) => {
      var data = {
        idtipo: manifestacao.idTipo,
        idsecretaria: manifestacao.idSecretaria,
        idassunto: manifestacao.idAssunto,
        idendereco: manifestacao.tbendereco.idEndereco,
        observacao: manifestacao.observacao,
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

  //Não estou usando
  criarHash(hash: string, idManifestacao: number) {
    return new Promise((resolve, reject) => {
      var data = {
        hash: hash,
        idManifestacao: idManifestacao
      }; 
      this.http.put(this.apiUrl + '/criarhash', data).
        subscribe((result: any) => {
          resolve(result.json);
          console.log(result)
        },
          (error) => {
            reject(error.json);
            console.log(error);  
        })
    })
  }

  
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

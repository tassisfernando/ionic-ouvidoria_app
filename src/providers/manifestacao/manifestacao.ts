import { IAnexo } from './../../interfaces/IAnexo';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { IManifestante } from './../../interfaces/IManifestante';
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

  apiUrl = 'https://ouvidoria.alessiojr.com/api';

  constructor(public http: HttpClient, private transfer: FileTransfer) {
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

  criarManifestacao(manifestacao: IManifestacao) {
    return new Promise<IManifestacao>((resolve, reject) => {
      var data = manifestacao;
      this.http.post<IManifestacao>(this.apiUrl + '/manifestacoes', data).
        subscribe((result: IManifestacao) => { //MUDEI AQUI "TIREI O ANY  "
          //this.uploadAnexo(manifestacao.tbanexo); => DESCOMENTAR AQUI DEPOIS
          resolve(result); //MUDEI AQUI "TIREI O .JSON"
          console.log(result)
        },
          (error) => {
            reject(error.json);
            console.log(error);
          })
    });

  }

  getManifestacaoPorId(idManifestacao: number){
    return new Promise<IManifestacao>(resolve => {
      this.http.get<IManifestacao>(this.apiUrl + '/manifestacoes/'+idManifestacao).subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  getManifestacoesPorId(manifestacoes: IManifestacao[]){
    return new Promise<IManifestacao[]>(resolve => {
      this.http.get<IManifestacao[]>(this.apiUrl + '/manifestacoesPorId/'+manifestacoes).subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  getManifestantePorId(idManifestacao: number){
    return new Promise<IManifestante>(resolve => {
      this.http.get<IManifestante>(this.apiUrl + '/manifestantes/'+idManifestacao).subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  //método para o providers
  uploadAnexo(anexo: IAnexo) {

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'fileApp',
      fileName: anexo.nmAnexo,
      chunkedMode: false,
      headers: {}
    }

    //Usar isso no provider, chamando o servidor de arquivos?
    fileTransfer.upload(anexo.nmAnexo, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      anexo.nmAnexo = "http://192.168.0.7:8080/static/images/ionicfile.jpg"; //mudar aqui
      return anexo; //talvez tirar
    }, (err) => {
      console.log(err);
    });
  }

  //Não estou usando
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
        idendereco: manifestacao.tb_endereco.idEndereco,
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

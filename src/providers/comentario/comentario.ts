import { IComentario } from './../../interfaces/IComentario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ComentarioProvider {

  apiUrl = 'https://ouvidoria.alessiojr.com/api';

  constructor(public http: HttpClient) {
    console.log('Hello ComentarioProvider Provider');
  }

  getComentarios(idManifestacao: number) {
    return new Promise<IComentario[]>(resolve => {
      this.http.get<IComentario[]>(this.apiUrl + '/comentarios/'+idManifestacao).subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  criarComentario(comentario: IComentario) {
    return new Promise<IComentario>((resolve, reject) => {
      var data = comentario;
      this.http.post<IComentario>(this.apiUrl + '/comentarios', data).
        subscribe((result: IComentario) => { //MUDEI AQUI "TIREI O ANY  "
          resolve(result); //MUDEI AQUI "TIREI O .JSON"
          console.log(result)
        },
          (error) => {
            reject(error.json);
            console.log(error);
          })
    });
  }

}

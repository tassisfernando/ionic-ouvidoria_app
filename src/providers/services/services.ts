import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServicesProvider {

  apiCep = 'https://viacep.com.br/ws/';
  apiGeoCode = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  key = '&key=AIzaSyANRfq8YBQV0B3EMkrhmd_4qTH-v7eXzzM';

  constructor(public http: HttpClient) { }

  //Método GET na API do CEP que retorna um endereço pelo CEP enviado
  getEnderecoPorCep(cep: string):any{
    return this.http.get(this.apiCep +cep+'/json/');
  }

  //Método GET na API do Google que retorna o endereço pela coordenada enviada
  getLocation(location: Coordinates){
    return this.http.get(this.apiGeoCode+location.latitude+","+location.longitude+this.key);
  }
}

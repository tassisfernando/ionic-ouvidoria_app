import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServicesProvider {

  apiCep = 'https://viacep.com.br/ws/';
  apiGeoCode = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  key = '&key=AIzaSyANRfq8YBQV0B3EMkrhmd_4qTH-v7eXzzM';

  constructor(public http: HttpClient) { }

  getEnderecoPorCep(cep: string):any{
    return this.http.get(this.apiCep +cep+'/json/');
  }

  getLocation(location: Coordinates){
    return this.http.get(this.apiGeoCode+location.latitude+","+location.longitude+this.key);
  }
}

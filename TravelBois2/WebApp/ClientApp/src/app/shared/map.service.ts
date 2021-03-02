import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  GetAddressCoords(address: string){
    return this.http.get('http://open.mapquestapi.com/geocoding/v1/address?key=juavnHR1leaMsRHnQ8XD7dot4eWWAM6v&location=' + address)
  }

  GetAddressCoords2(address: string){
    let request = new XMLHttpRequest();
    request.open("GET", 'http://open.mapquestapi.com/geocoding/v1/address?key=juavnHR1leaMsRHnQ8XD7dot4eWWAM6v&location=' + address);
    request.send();
    request.onload = () => {
      console.debug(request);
      if(request.status == 200) {
        console.debug(JSON.parse(request.response));
      }
      else {
        console.debug('error ${request.status} ${request.statusText}')
      }
    }
  }
}
